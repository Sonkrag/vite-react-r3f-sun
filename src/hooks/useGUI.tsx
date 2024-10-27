import { useEffect, useRef } from 'react';
import { GUI } from 'lil-gui';
import {
  AmbientLight,
  Mesh,
  MeshStandardMaterial,
  PointLight,
  DirectionalLight,
} from 'three';

const useGUI = (
  sphereRef: React.RefObject<Mesh>,
  ambientLightRef: React.RefObject<AmbientLight>,
  pointLightRef: React.RefObject<PointLight>,
  directionalLightRef: React.RefObject<DirectionalLight>
) => {
  const guiRef = useRef<GUI | null>(null);

  useEffect(() => {
    // Initialize GUI
    const gui = new GUI();
    guiRef.current = gui;

    // Control for ambient light intensity
    const ambientLightFolder = gui.addFolder('Ambient Light');
    const ambientLight = { intensity: 0.5 };
    ambientLightFolder
      .add(ambientLight, 'intensity', 0, 1, 0.01)
      .onChange((value: number) => {
        const ambientLightObject = ambientLightRef.current;
        if (ambientLightObject) {
          ambientLightObject.intensity = value;
        }
      });
    ambientLightFolder.open();

    // Control for point light
    const pointLightFolder = gui.addFolder('Point Light');
    const pointLight = { intensity: 1, distance: 50 }; // Default values
    pointLightFolder
      .add(pointLight, 'intensity', 0, 2, 0.01)
      .onChange((value: number) => {
        const pointLightObject = pointLightRef.current;
        if (pointLightObject) {
          pointLightObject.intensity = value;
        }
      });
    pointLightFolder
      .add(pointLight, 'distance', 0, 100)
      .onChange((value: number) => {
        const pointLightObject = pointLightRef.current;
        if (pointLightObject) {
          pointLightObject.distance = value;
        }
      });
    pointLightFolder.open();

    // Control for directional light
    const directionalLightFolder = gui.addFolder('Directional Light');
    const directionalLight = { intensity: 1 }; // Default values
    directionalLightFolder
      .add(directionalLight, 'intensity', 0, 2, 0.01)
      .onChange((value: number) => {
        const directionalLightObject = directionalLightRef.current;
        if (directionalLightObject) {
          directionalLightObject.intensity = value;
        }
      });
    directionalLightFolder.open();

    // Control for sphere color
    const sphereFolder = gui.addFolder('Sphere');
    const sphereProps = { color: '#FFA500' }; // Initial color (orange)
    sphereFolder.addColor(sphereProps, 'color').onChange((value: string) => {
      const sphereMaterial = sphereRef.current?.material;
      if (sphereMaterial) {
        if (Array.isArray(sphereMaterial)) {
          (sphereMaterial[0] as MeshStandardMaterial).color.set(value);
        } else {
          (sphereMaterial as MeshStandardMaterial).color.set(value);
        }
      }
    });

    // Cleanup
    return () => {
      gui.destroy();
    };
  }, [sphereRef, ambientLightRef, pointLightRef, directionalLightRef]);

  return guiRef; // Return the GUI ref if needed elsewhere
};

export default useGUI;
