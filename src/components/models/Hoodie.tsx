import { useGLTF } from "@react-three/drei";

import { useGetTexture } from "../../utils";
import { useSnapshot } from "valtio";
import { state } from "../../store";
import { DoubleSide, MeshPhysicalMaterial } from "three";

export function Hoodie(props) {
  const snapshot = useSnapshot(state);
  const { nodes } = useGLTF("/assets/models/reg-kangaroo.glb");
  console.log("nodes:", nodes);

  const texture = useGetTexture(snapshot);
  const material = new MeshPhysicalMaterial(texture);
  material.side = DoubleSide;

  return (
    <group {...props} dispose={null} scale={0.01} rotation={[Math.PI / 2, 0, 0]}>
      {Object.keys(nodes).map((key, index) => {
        if (key !== "Scene") {
          return <mesh key={index} geometry={nodes[key].geometry} material={material} castShadow />;
        }
        return null;
      })}
    </group>
  );
}

useGLTF.preload("/assets/models/hoodie.glb");
