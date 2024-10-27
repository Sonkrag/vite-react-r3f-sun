import { OrbitControls } from '@react-three/drei';
import { AmbientLight, Mesh, PointLight, DirectionalLight } from 'three';
import Sphere from './Sphere'; // Import the Sphere component
import useGUI from '../hooks/useGUI'; // Import the custom hook
import { forwardRef, useRef } from 'react';

const Scene = forwardRef<Mesh, { color: string }>((props, _ref) => {
  const sphereRef = useRef<Mesh>(null); // Ref for the sphere
  const ambientLightRef = useRef<AmbientLight | null>(null); // Create a ref for ambient light
  const pointLightRef = useRef<PointLight | null>(null); // Create a ref for point light
  const directionalLightRef = useRef<DirectionalLight | null>(null); // Create a ref for directional light

  // Use the custom hook for GUI logic
  useGUI(sphereRef, ambientLightRef, pointLightRef, directionalLightRef);

  return (
    <>
      <ambientLight intensity={0.5} ref={ambientLightRef} />
      <pointLight position={[10, 10, 10]} ref={pointLightRef} />
      <directionalLight position={[-5, 5, 5]} ref={directionalLightRef} />
      <Sphere ref={sphereRef} color={props.color} />

      {/* OrbitControls for 3D interaction */}
      <OrbitControls />
    </>
  );
});

export default Scene;
