// src/Sphere.tsx
import { forwardRef } from 'react';
import { Mesh } from 'three';

interface SphereProps {
  color: string;
}

const Sphere = forwardRef<Mesh, SphereProps>(({ color }, ref) => {
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
});

export default Sphere;
