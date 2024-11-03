import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { DoubleSide, MeshPhysicalMaterial } from "three";
import { useGetTexture } from "../../utils";

const defaultParts = [
  "collar",
  // "button-one_1",
  "button-one_2",
  // "button-one_3",
  // "button-two_1",
  "button-two_2",
  // "button-two_3",
];

const modelPath = "/assets/models/reg-polo.glb";

export function Polo(props) {
  const { nodes } = useGLTF(modelPath);
  console.log("nodes:", nodes);

  const {
    "Material Type": materialType,
    "Sleeve Length": sleeveType,
    "Body Length": bodyType,
  } = useControls({
    "Material Type": {
      options: {
        "French Terry Black": "black",
        "French Terry White": "white",
        "French Terry Grey Marle": "grey",
      },
    },
    "Sleeve Length": {
      options: {
        "Short Sleeve": "short-sleeve",
        "Long Sleeve": "long-sleeve",
      },
    },
    "Body Length": {
      options: {
        "Regular Body": "reg",
        "Cropped Body": "crop",
      },
    },
  });
  const texture = useGetTexture(materialType);
  console.log("materialType:", materialType);
  const material = new MeshPhysicalMaterial(texture);
  material.side = DoubleSide;
  material.displacementScale = 0.005;
  material.normalScale.set(2, 2);
  // material.color.set(colour);

  return (
    <group {...props} dispose={null} scale={0.02} rotation={[Math.PI / 2, 0, 0]}>
      {Object.keys(nodes).map((key, index) => {
        if (key !== "Scene" && nodes[key].type === "Mesh") {
          const isVisible =
            key.includes(bodyType) || key.includes(sleeveType) || defaultParts.includes(key);
          return (
            <mesh
              key={index}
              geometry={nodes[key].geometry}
              material={material}
              castShadow
              visible={isVisible}
            />
          );
        }
        return null;
      })}
    </group>
  );
}

useGLTF.preload(modelPath);
