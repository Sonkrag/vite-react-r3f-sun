import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';

function App() {
  return (
    <>
      {/* React Three Fiber Canvas */}
      <Canvas>
        <Scene color={'#FFA500'} />
      </Canvas>
    </>
  );
}

export default App;
