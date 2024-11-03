import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { DoubleSide, MeshPhysicalMaterial } from "three";
import { useGetTexture } from "../../utils";

const defaultParts = ["hood-highpoly", "left-sleeve", "right-sleeve", "left-cuff", "right-cuff"];

const modelPath = "/assets/models/hoodie-full-clean-test.glb";

export function Hoodie(props) {
  const { nodes } = useGLTF(modelPath);
  console.log("nodes:", nodes);
  const { "Material Type": materialType, "Configuration": type } = useControls({
    "Material Type": {
      options: {
        "French Terry Black": "black",
        "French Terry White": "white",
        "French Terry Grey Marle": "grey",
      },
    },
    "Configuration": {
      options: {
        "Regular Kangaroo Pocket": "reg-fp",
        "Regular Side Pocket": "reg-sp",
        "Cropped Kangaroo Pocket": "crop-fp",
        "Cropped No Pocket": "crop-np",
        "Cropped Side Pocket": "crop-sp",
      },
    },
    // colour: { value: "blue" },
  });
  console.log("materialType:", materialType);
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
        if (key !== "Scene") {
          const isVisible = key.includes(type) || defaultParts.includes(key);
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
