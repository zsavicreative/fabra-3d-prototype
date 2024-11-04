import { proxy } from "valtio";

export const state = proxy({
  introFinished: false,
  currentMeshType: "hoodie",
  currentHoveredMesh: null,
  currentSelectedMesh: null,
  currentMeshArray: [],
});
