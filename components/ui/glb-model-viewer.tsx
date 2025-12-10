"use client";
import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  useGLTF, 
  Center,
  Environment,
  useEnvironment
} from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  modelPath: string;
  scale?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  onLoaded?: () => void;
}

function Model({ modelPath, scale = 1, autoRotate = false, autoRotateSpeed = 0.5, onLoaded }: ModelProps) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);
  const { camera, controls } = useThree();

  // Clone and setup the scene
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone();
    
    // Compute bounding box for proper scaling and centering
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());
    
    // Center the model
    clone.position.x -= center.x;
    clone.position.y -= center.y;
    clone.position.z -= center.z;
    
    // Traverse and setup materials properly
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          // Clone material to avoid sharing issues
          if (Array.isArray(child.material)) {
            child.material = child.material.map(mat => {
              const cloned = mat.clone();
              cloned.needsUpdate = true;
              return cloned;
            });
          } else {
            child.material = child.material.clone();
            child.material.needsUpdate = true;
          }
        }
      }
    });
    
    return { clone, size, center };
  }, [scene]);

  // Setup camera based on model size
  useEffect(() => {
    if (clonedScene) {
      const { size } = clonedScene;
      
      // Position camera to see the whole model
      const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
      let cameraZ = Math.abs(size / 2 / Math.tan(fov / 2));
      cameraZ *= 1.5; // Add padding
      
      camera.position.set(cameraZ * 0.5, cameraZ * 0.2, cameraZ * 0.5);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      
      // Update controls if available
      if (controls) {
        (controls as any).target.set(0, 0, 0);
        (controls as any).maxDistance = size * 10;
        (controls as any).update();
      }
      
      onLoaded?.();
    }
  }, [clonedScene, camera, controls, onLoaded]);

  // Auto-rotate if enabled
  useFrame((_, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * autoRotateSpeed;
    }
  });

  return (
    <group ref={modelRef}>
      <primitive 
        object={clonedScene.clone} 
        scale={scale} 
      />
    </group>
  );
}

// Loading fallback - wireframe box
function LoadingFallback() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#666" wireframe />
    </mesh>
  );
}

// Scene setup component - handles lighting similar to three-gltf-viewer
function SceneSetup() {
  const { gl, scene } = useThree();
  
  useEffect(() => {
    // Setup renderer like three-gltf-viewer
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    
    // Transparent background
    gl.setClearColor(0x000000, 0);
    scene.background = null;
  }, [gl, scene]);
  
  return null;
}

interface GLBModelViewerProps {
  modelPath: string;
  className?: string;
  cameraPosition?: [number, number, number];
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  scale?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  minDistance?: number;
  maxDistance?: number;
  backgroundColor?: string;
}

export const GLBModelViewer: React.FC<GLBModelViewerProps> = ({
  modelPath,
  className = "",
  cameraPosition = [3, 2, 3],
  autoRotate = false,
  autoRotateSpeed = 0.5,
  scale = 1,
  enableZoom = true,
  enablePan = false,
  minDistance = 0.5,
  maxDistance = 20,
  backgroundColor = "transparent",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className={`${className} relative`} 
      style={{ touchAction: "none", background: backgroundColor }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}
      <Canvas
        camera={{ 
          position: cameraPosition, 
          fov: 45,
          near: 0.01,
          far: 1000,
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          premultipliedAlpha: false,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        style={{ background: "transparent", pointerEvents: "auto" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        {/* Scene setup */}
        <SceneSetup />
        
        {/* Lighting setup similar to three-gltf-viewer's "Neutral" environment */}
        {/* Ambient light for base illumination */}
        <ambientLight intensity={0.3} color="#FFFFFF" />
        
        {/* Main directional light attached to camera */}
        <directionalLight 
          position={[0.5, 0, 0.866]} 
          intensity={0.8 * Math.PI} 
          color="#FFFFFF"
        />
        
        {/* Use neutral/room environment for realistic reflections */}
        <Environment preset="apartment" />
        
        {/* The 3D Model */}
        <Suspense fallback={<LoadingFallback />}>
          <Center>
            <Model 
              modelPath={modelPath} 
              scale={scale} 
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
              onLoaded={() => setIsLoading(false)}
            />
          </Center>
        </Suspense>
        
        {/* Orbit controls for user interaction */}
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.05}
          enableZoom={enableZoom}
          enablePan={enablePan}
          enableRotate={true}
          minDistance={minDistance}
          maxDistance={maxDistance}
          screenSpacePanning={true}
          rotateSpeed={0.8}
          panSpeed={0.8}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  );
};

// Preload models for better performance
export const preloadModel = (path: string) => {
  useGLTF.preload(path);
};
