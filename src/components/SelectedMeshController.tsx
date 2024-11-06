import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { state } from "../store";
import { folder, useControls } from "leva";
import { createPBRMaterial } from "../utils";
import { useGraph, useThree } from "@react-three/fiber";
import { keyValueLists } from "../constants";
import { buttonParts } from "./models/Polo";

export default function SelectedMeshController() {
  const { scene } = useThree();
  console.log(scene);
  // get the nodes from the scene
  const { nodes } = useGraph(scene);

  console.log(nodes);
  const snapshot = useSnapshot(state);
  console.log("snapshot:", snapshot);

  const currentMeshMaterialList = Object.keys(
    snapshot.currentMaterials[snapshot.currentMeshType],
  ).reduce((acc, key) => {
    if (nodes[key] && !buttonParts.includes(key)) {
      return {
        ...acc,
        [keyValueLists[snapshot.currentMeshType][key]]: {
          options: {
            "French Terry Grey Marle": "grey",
            "French Terry Black": "black",
            "French Terry White": "white",
          },
        },
      };
    }
    return acc;
  }, {});

  console.log("currentMeshMaterialList:", currentMeshMaterialList);

  const { "Selected Part Material": selectedMeshMat } = useControls({
    "Selected Part Material": {
      options: {
        "French Terry Grey Marle": "grey",
        "French Terry Black": "black",
        "French Terry White": "white",
      },
    },

    "Current Mesh Materials": folder({
      ...currentMeshMaterialList,
    }),
  });

  const material = createPBRMaterial(selectedMeshMat);

  useEffect(() => {
    console.log(selectedMeshMat);
    if (snapshot.currentSelectedMesh) {
      const selectedMesh = nodes[snapshot.currentSelectedMesh];
      if (selectedMesh) {
        selectedMesh.material = material;
      }
    }
  }, [selectedMeshMat]);

  return null;
}
