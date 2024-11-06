import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { MeshPhysicalMaterial } from "three";
import { createPBRMaterial, useGetTexture } from "../../utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../store";

const defaultParts = ["collar"];

export const buttonParts = [
  // "button-one_1",
  "button-one_2",
  // "button-one_3",
  // "button-two_1",
  "button-two_2",
  // "button-two_3",
];

const modelPath = "/assets/models/reg-polo.glb";

const buttonMaterial = new MeshPhysicalMaterial({
  metalness: 0.5,
  reflectivity: 0.5,
  roughness: 0.5,
});

export function Polo(props) {
  const poloGroupRef = useRef();
  const snap = useSnapshot(state);
  const { nodes } = useGLTF(modelPath);
  const {
    "Material Type": materialType,
    "Sleeve Length": sleeveType,
    "Body Length": bodyType,
    "Button Colour": buttonColour,
  } = useControls({
    "Material Type": {
      options: {
        "French Terry Grey Marle": "grey",
        "French Terry Black": "black",
        "French Terry White": "white",
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

    "Button Colour": { value: "#ffffff" },
  });

  const currentMeshesArray = useMemo(() => {
    //generate the array of meshes to show based on key and type
    const currentMeshesArray = [];
    Object.keys(nodes).map((key) => {
      if (key !== "Scene" && nodes[key].type === "Mesh") {
        const isVisible =
          key.includes(bodyType) || key.includes(sleeveType) || defaultParts.includes(key);

        if (isVisible) {
          currentMeshesArray.push(nodes[key]);
        }
      }
    });

    state.currentMeshes["polo"] = currentMeshesArray;
    return currentMeshesArray;
  }, [nodes, bodyType, sleeveType]);

  function handleClicked(e) {
    e.stopPropagation();
    // console.log("clicked:", e.object.name);
    state.currentSelectedMesh = e.object.name;
  }

  const currentTexture = useGetTexture(materialType);

  useEffect(() => {
    const currentMaterial = createPBRMaterial(currentTexture);

    if (poloGroupRef.current) {
      poloGroupRef.current.children.forEach((child) => {
        if (child.name !== "Scene") {
          child.material = currentMaterial;
        }
      });
    }
  }, [materialType, sleeveType, bodyType]);

  // console.log(state.currentMaterials["polo"]);

  return (
    <group
      {...props}
      dispose={null}
      scale={0.02}
      rotation={[Math.PI / 2, 0, 0]}
      ref={poloGroupRef}
      onClick={(e) => handleClicked(e)}
    >
      <mesh
        geometry={nodes["button-one_2"].geometry}
        material={buttonMaterial}
        material-color={buttonColour}
        name='button-one_2'
      />

      <mesh
        geometry={nodes["button-two_2"].geometry}
        material={buttonMaterial}
        material-color={buttonColour}
        name='button-two_2'
      />

      {currentMeshesArray.map((mesh, index) => (
        <mesh key={index} geometry={mesh.geometry} name={mesh.name} castShadow />
      ))}
    </group>
  );
}

useGLTF.preload(modelPath);
