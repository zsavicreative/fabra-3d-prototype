import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { useControls } from "leva";
import { createPBRMaterial, useGetTexture } from "../../utils";
import { state } from "../../store";

const defaultParts = ["hood-highpoly", "left-sleeve", "right-sleeve", "left-cuff", "right-cuff"];

const modelPath = "/assets/models/hoodie-full-clean-test.glb";

export function Hoodie() {
  const snapshot = useSnapshot(state);
  const hoodieGroupRef = useRef();
  const { nodes } = useGLTF(modelPath);

  const [
    {
      "Material Type": materialType,
      "Configuration": type,
      "Selected Part Material": selectedMeshMat,
    },
    set,
  ] = useControls(() => ({
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
    "Selected Part Material": {
      options: {
        "French Terry Grey Marle": "grey",
        "French Terry Black": "black",
        "French Terry White": "white",
      },
    },
  }));

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
    state.currentSelectedMesh = e.object.name;

    hoodieGroupRef.current.children.forEach((child) => {
      if (child.name === e.object.name) {
        set({ "Selected Part Material": child.material.name });
      }
    });
  }

  const currentFullTexture = useGetTexture(materialType);
  const selectedMeshTexture = useGetTexture(selectedMeshMat);

  useEffect(() => {
    const currentMaterial = createPBRMaterial(currentFullTexture, materialType);

    if (hoodieGroupRef.current) {
      hoodieGroupRef.current.children.forEach((child) => {
        if (child.name !== "Scene") {
          child.material = currentMaterial;
        }
      });
    }
  }, [materialType, type]);

  useEffect(() => {
    if (snapshot.currentSelectedMesh) {
      hoodieGroupRef.current.children.forEach((child) => {
        if (child.name === snapshot.currentSelectedMesh) {
          child.material = createPBRMaterial(selectedMeshTexture, selectedMeshMat);
        }
      });
    }
  }, [selectedMeshMat]);

  return (
    <group
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
