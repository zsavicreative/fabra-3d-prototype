import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { DoubleSide, MeshPhysicalMaterial } from "three";
import { useGetTexture } from "../../utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../store";

const defaultParts = ["collar"];

const buttonParts = [
  // "button-one_1",
  "button-one_2",
  // "button-one_3",
  // "button-two_1",
  "button-two_2",
  // "button-two_3",
];

const modelPath = "/assets/models/reg-polo.glb";

export function Polo(props) {
  const ref = useRef();
  const snap = useSnapshot(state);
  const [hovered, setHovered] = useState(null);
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
    let currentMeshesArray = [];
    Object.keys(nodes).map((key, index) => {
      if (key !== "Scene" && nodes[key].type === "Mesh") {
        const isVisible =
          key.includes(bodyType) ||
          key.includes(sleeveType) ||
          defaultParts.includes(key) ||
          buttonParts.includes(key);
        const isButtonMesh = buttonParts.includes(key);

        if (isVisible || isButtonMesh) {
          currentMeshesArray.push(nodes[key]);
        }
      }
    });

    state.currentMeshArray = currentMeshesArray;
    return currentMeshesArray;
  }, [nodes, bodyType, sleeveType]);

  const texture = useGetTexture(materialType);
  const shirtMaterial = new MeshPhysicalMaterial(texture);
  shirtMaterial.side = DoubleSide;
  shirtMaterial.displacementScale = 0.005;
  shirtMaterial.normalScale.set(2, 2);

  const buttonMaterial = new MeshPhysicalMaterial({ color: buttonColour });

  function handlePointerOver(e) {
    e.stopPropagation();
    // console.log(e.object.name);
    setHovered(e.object.name);
  }

  function handleClicked(e) {
    e.stopPropagation();
    // console.log("clicked:", e.object.name);
    state.currentSelectedMesh = e.object.name;
  }

  function handlePointerOut(e) {
    e.stopPropagation();
    setHovered(null);
  }

  useEffect(() => {
    if (hovered) {
      // console.log("hovered:", hovered);
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
      {currentMeshesArray.map((mesh, index) => {
        return (
          <mesh
            key={index}
            geometry={mesh.geometry}
            material={buttonParts.includes(mesh.name) ? buttonMaterial : shirtMaterial}
            name={mesh.name}
            castShadow
          />
        );
      })}
    </group>
  );
}

useGLTF.preload(modelPath);
