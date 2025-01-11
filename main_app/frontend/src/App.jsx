import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

function App() {
  const params = new URLSearchParams(window.location.search);
  const characterName = params.get("name")?.toLowerCase() || "emma";

  return (
    <>
      <Loader />
      <Leva hidden />
      <UI />
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Experience characterName={characterName} />
      </Canvas>
    </>
  );
}

export default App;
