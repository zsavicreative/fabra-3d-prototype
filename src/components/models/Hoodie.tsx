import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { createPBRMaterial, useGetTexture } from "../../utils";
import { useEffect, useMemo, useRef } from "react";
import { state } from "../../store";

const defaultParts = ["hood-highpoly", "left-sleeve", "right-sleeve", "left-cuff", "right-cuff"];

const modelPath = "/assets/models/hoodie-full-clean-test.glb";

export function Hoodie(props) {
  const hoodieGroupRef = useRef();
  const { nodes } = useGLTF(modelPath);

  const { "Material Type": materialType, "Configuration": type } = useControls({
    "Material Type": {
      options: {
        "French Terry Grey Marle": "grey",
        "French Terry Black": "black",
        "French Terry White": "white",
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
  });

  const currentMeshesArray = useMemo(() => {
    const currentMeshesArray = [];
    Object.keys(nodes).map((key) => {
      if (key !== "Scene" && nodes[key].type === "Mesh") {
        const isVisible = key.includes(type) || defaultParts.includes(key);
        if (isVisible) {
          currentMeshesArray.push(nodes[key]);
        }
      }
    });

    return currentMeshesArray;
  }, [nodes, type]);

  function handleClicked(e) {
    e.stopPropagation();
    // console.log("clicked:", e.object.name);
    state.currentSelectedMesh = e.object.name;
  }

  const currentTexture = useGetTexture(materialType);

  useEffect(() => {
    const currentMaterial = createPBRMaterial(currentTexture);

    if (hoodieGroupRef.current) {
      hoodieGroupRef.current.children.forEach((child) => {
        if (child.name !== "Scene") {
          child.material = currentMaterial;
        }
      });
    }
  }, [materialType, type]);

  return (
    <group
      {...props}
      dispose={null}
      scale={0.02}
      rotation={[Math.PI / 2, 0, 0]}
      ref={hoodieGroupRef}
      onClick={(e) => handleClicked(e)}
    >
      {currentMeshesArray.map((mesh, index) => (
        <mesh
          key={index}
          geometry={mesh.geometry}
          name={mesh.name}
          castShadow
          receiveShadow
          //test
        />
      ))}
    </group>
  );
}

useGLTF.preload(modelPath);
