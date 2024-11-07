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
import { useSpring, animated } from "@react-spring/three";
import { useControls } from "leva";
import { useSnapshot } from "valtio";
import { easing, dampE } from "maath";
import { keyValueLists } from "../constants";
import { state } from "../store";
import { Hoodie } from "./models/Hoodie";
import { Polo } from "./models/Polo";

const cameraConfig = {
  position: [0, 0, 3.8],
  fov: 30,
};

export default function ThreeScene() {
  // const snapshot = useSnapshot(state);

  const { "Apparel Type": apparel } = useControls({
    "Apparel Type": {
      options: {
        "Classic Hoodie": "hoodie",
        "Classic Polo Sweatshirt": "polo",
      },
    },
  });

  useEffect(() => {
    state.currentMeshType = apparel;
  }, [apparel]);

  return (
    <div className='w-full h-screen'>
      <Canvas shadows camera={cameraConfig} gl={{ preserveDrawingBuffer: false }}>
        {/* <spotLight
          position={[0, 0.5, 1.5]}
          angle={1}
          penumbra={0.25}
          shadow-mapSize={1024}
          castShadow
          intensity={5}
        /> */}

        <spotLight
          position={[0, 0.3, 1.25]}
          angle={Math.PI / 4}
          penumbra={0.01}
          shadow-mapSize={2048}
          intensity={1}
        />

        <CameraRig>
          <OrbitControls
            // minPolarAngle={1.25}
            // maxPolarAngle={1.25}
            // enablePan={false}
            makeDefault
          />
        </CameraRig>

        {/* <Backdrop /> */}
        <Center>
          {apparel === "hoodie" && <Hoodie />}
          {apparel === "polo" && <Polo />}
        </Center>

        <ContactShadows
          position={[0, -0.9, 0]}
          opacity={0.8}
          scale={3}
          blur={3}
          far={4}
          onClick={() => (state.currentSelectedMesh = null)}
        />
        <Environment
          preset='city'
          background={false}
          // environmentRotation={[0, -1, 1]}
          environmentIntensity={1}
          // resolution={2048}
        />
      </Canvas>
    </div>
  );
}

const cameraLocations = {
  "intro": {
    position: [-1.5, 1, 3.8],
    target: [0, 0, 0],
  },
  "default": {
    position: [0, 0, 3.8],
    target: [0, 0, 0],
  },
  "Front Body": {
    position: [0, 0.7, 4],
    target: [0, 0, 0],
  },
  "Back Body": {
    position: [0, 0.7, -4],
    target: [0, 0, 0],
  },
  "Body Band": {
    position: [0, -1, 2],
    target: [0, -0.5, 0],
  },
  "Left Sleeve": {
    position: [3, 0, 1],
    target: [0, 0, 0],
  },
  "Right Sleeve": {
    position: [-3, 0, 1],
    target: [0, 0, 0],
  },
  "Left Cuff": {
    position: [1.25, -1.25, 0.25],
    target: [0, 0, 0],
  },
  "Right Cuff": {
    position: [-1.25, -1.25, 0.25],
    target: [0, 0, 0],
  },
  "Collar": {
    position: [0.5, 2, 1],
    target: [0, 0.5, 0],
  },
  "Hood": {
    position: [0.5, 2, 1],
    target: [0, 0.5, 0],
  },
  "Front Pocket": {
    position: [0, -0.5, 2.5],
    target: [0, -0.25, 0],
  },
};

function CameraRig({ children }) {
  const groupRef = useRef();
  const snapshot = useSnapshot(state);
  const currentSelectedMesh = keyValueLists[snapshot.currentMeshType][snapshot.currentSelectedMesh];

  const [springs, springCtrl] = useSpring(
    () => ({
      position:
        cameraLocations[currentSelectedMesh]?.position || cameraLocations["default"].position,
      target: cameraLocations[currentSelectedMesh]?.target || cameraLocations["default"].target,
      config: { mass: 5, friction: 100 },
      immediate: true,
    }),
    [],
  );

  useFrame((state, delta) => {
    if (!currentSelectedMesh) return;
    state.camera.position.lerp(
      {
        x: springs.position.get()[0],
        y: springs.position.get()[1],
        z: springs.position.get()[2],
      },
      delta * 20,
    );

    state.camera.lookAt(springs.target.get()[0], springs.target.get()[1], springs.target.get()[2]);
  });

  useEffect(() => {
    const positionLocation =
      cameraLocations[currentSelectedMesh]?.position || cameraLocations["default"].position;
    const targetLocation =
      cameraLocations[currentSelectedMesh]?.target || cameraLocations["default"].target;

    springCtrl.start({
      position: positionLocation,
      target: targetLocation,
    });
  }, [currentSelectedMesh]);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        state.currentSelectedMesh = null;
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return <group ref={groupRef}>{children}</group>;
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
