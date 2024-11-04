import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Center,
  ContactShadows,
  Decal,
  Environment,
  OrbitControls,
  RandomizedLight,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useControls } from "leva";
import { useSnapshot } from "valtio";
import { easing } from "maath";
import { state } from "../store";
import { Hoodie } from "./models/Hoodie";
import { Polo } from "./models/Polo";

const cameraConfig = {
  position: [0, 0, 3.8],
  fov: 30,
};

export default function ThreeScene() {
  const snapshot = useSnapshot(state);

  const { "Apparel Type": apparel } = useControls({
    "Apparel Type": {
      options: {
        "Classic Hoodie": "hoodie",
        "Classic Polo Sweatshirt": "polo",
      },
    },

    // colour: { value: "blue" },
  });

  useEffect(() => {
    state.currentMeshType = apparel;
  }, [apparel]);

  // const texture = useGetTexture(snapshot);

  return (
    <div className='w-full h-screen'>
      <Canvas shadows camera={cameraConfig} gl={{ preserveDrawingBuffer: true }}>
        {/* <ambientLight intensity={0.5} /> */}
        <spotLight
          position={[0, 0.5, 1.5]}
          angle={1}
          penumbra={0.25}
          shadow-mapSize={2048}
          castShadow
          intensity={5}
        />

        <spotLight
          position={[0, 0.05, -1.5]}
          angle={2}
          penumbra={0.25}
          shadow-mapSize={2048}
          castShadow
          intensity={3.5}
        />

        {/* <CameraRig> */}
        <OrbitControls minPolarAngle={1.25} maxPolarAngle={1.25} />

        {/* <Backdrop /> */}
        <Center>
          {apparel === "hoodie" && <Hoodie />}
          {apparel === "polo" && <Polo />}
        </Center>
        {/* </CameraRig> */}

        <ContactShadows position={[0, -0.9, 0]} opacity={0.8} scale={3} blur={3} far={4} />
        <Environment preset='city' background={false} />
      </Canvas>
    </div>
  );
}

function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [snap.intro ? -state.viewport.width / 4 : 0, 0, 3.8],
      0.25,
      delta,
    );
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta,
    );
  });
  return <group ref={group}>{children}</group>;
}

function Backdrop() {
  const shadows = useRef();
  useFrame((state, delta) =>
    easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta),
  );
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={5}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.2]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}
