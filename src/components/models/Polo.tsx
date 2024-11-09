import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { MeshPhysicalMaterial } from "three";
import { createPBRMaterial, useGetTexture } from "../../utils";
import { useEffect, useMemo, useRef } from "react";
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
  const snapshot = useSnapshot(state);
  const poloGroupRef = useRef();
  const { nodes } = useGLTF(modelPath);

  const [
    {
      "Full Material Type": materialType,
      "Sleeve Length": sleeveType,
      "Body Length": bodyType,
      "Button Colour": buttonColour,
      "Selected Part Material": selectedMeshMat,
    },
    set,
  ] = useControls(() => ({
    "Full Material Type": {
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

    "Selected Part Material": {
      options: {
        "French Terry Grey Marle": "grey",
        "French Terry Black": "black",
        "French Terry White": "white",
      },
    },
  }));

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

    return currentMeshesArray;
  }, [nodes, bodyType, sleeveType]);

  function handleClicked(e) {
    e.stopPropagation();
    state.currentSelectedMesh = e.object.name;

    poloGroupRef.current.children.forEach((child) => {
      if (child.name === e.object.name) {
        set({ "Selected Part Material": child.material.name });
      }
    });
  }

  const currentFullTexture = useGetTexture(materialType, "polo");
  const selectedMeshTexture = useGetTexture(selectedMeshMat, "polo");

  useEffect(() => {
    const currentMaterial = createPBRMaterial(currentFullTexture, materialType);

    if (poloGroupRef.current) {
      poloGroupRef.current.children.forEach((child) => {
        if (child.name !== "Scene") {
          child.material = currentMaterial;
        }
      });
    }
  }, [materialType, sleeveType, bodyType]);

  useEffect(() => {
    if (snapshot.currentSelectedMesh) {
      poloGroupRef.current.children.forEach((child) => {
        if (child.name === snapshot.currentSelectedMesh) {
          child.material = createPBRMaterial(selectedMeshTexture, selectedMeshMat);
        }
      });
    }
  }, [selectedMeshMat]);

  return (
    <>
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
          color={buttonColour}
          name='button-one_2'
        />

        <mesh
          geometry={nodes["button-two_2"].geometry}
          material={buttonMaterial}
          color={buttonColour}
          name='button-two_2'
        />

        {currentMeshesArray.map((mesh, index) => (
          <mesh key={index} geometry={mesh.geometry} name={mesh.name} castShadow />
        ))}
      </group>
    </>
  );
}

useGLTF.preload(modelPath);
