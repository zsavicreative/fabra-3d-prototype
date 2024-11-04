import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { DoubleSide, MeshPhysicalMaterial } from "three";
import { createPBRMaterial, useGetTexture } from "../../utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { state } from "../../store";

const defaultParts = ["hood-highpoly", "left-sleeve", "right-sleeve", "left-cuff", "right-cuff"];

const modelPath = "/assets/models/hoodie-full-clean-test.glb";

export function Hoodie(props) {
  const [hovered, setHovered] = useState(null);
  const ref = useRef();
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
    let currentMeshesArray = [];
    Object.keys(nodes).map((key, index) => {
      if (key !== "Scene" && nodes[key].type === "Mesh") {
        const isVisible = key.includes(type) || defaultParts.includes(key);
        if (isVisible) {
          currentMeshesArray.push(nodes[key]);
        }
      }
    });

    return currentMeshesArray;
  }, [type]);

  function handlePointerOver(e) {
    e.stopPropagation();
    console.log(e.object.name);
    setHovered(e.object.name);
  }

  function handleClicked(e) {
    e.stopPropagation();
    console.log("clicked:", e.object.name);
    state.currentSelectedMesh = e.object.name;
  }

  function handlePointerOut(e) {
    e.stopPropagation();
    setHovered(null);
  }

  useEffect(() => {
    if (hovered) {
      console.log("hovered:", hovered);
      state.currentHoveredMesh = hovered;
    }
  }, [hovered]);

  return (
    <group
      {...props}
      dispose={null}
      scale={0.02}
      rotation={[Math.PI / 2, 0, 0]}
      ref={ref}
      onPointerOver={(e) => handlePointerOver(e)}
      onPointerOut={(e) => handlePointerOut(e)}
      onPointerMissed={(e) => handlePointerOut(e)}
      onClick={(e) => handleClicked(e)}
    >
      {currentMeshesArray.map((mesh, index) => (
        <mesh
          key={index}
          geometry={mesh.geometry}
          material={createPBRMaterial(materialType)}
          name={mesh.name}
          castShadow
        />
      ))}
    </group>
  );
}

useGLTF.preload(modelPath);
