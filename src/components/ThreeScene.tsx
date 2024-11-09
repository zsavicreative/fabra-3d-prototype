import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useSpring } from "@react-spring/three";
import { useControls } from "leva";
import { useSnapshot } from "valtio";
import { keyValueLists } from "../constants";
import { state } from "../store";
import { Hoodie } from "./models/Hoodie";
import { Polo } from "./models/Polo";

const cameraConfig = {
  position: [0, 0, 3.8],
  fov: 30,
};

export default function ThreeScene() {
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

        <Suspense fallback={<RotatingBox />}>
          <Center>
            {apparel === "hoodie" && <Hoodie />}
            {apparel === "polo" && <Polo />}
          </Center>
        </Suspense>

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
      config: { mass: 2, friction: 50 },
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
      delta * 10,
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

function RotatingBox() {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh ref={mesh} scale={0.5}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
}
