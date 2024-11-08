import { proxy } from "valtio";
import { create } from "zustand";

export const state = proxy({
  introFinished: false,
  currentMeshType: "hoodie",
  currentHoveredMesh: null,
  currentSelectedMesh: "intro",
});

export const useStore = create((set) => ({
  currentMaterials: {
    hoodie: {
      "reg-sp-left-pocket": null,
      "reg-sp-right-pocket": null,
      "crop-fp-back": null,
      "crop-fp-front": null,
      "crop-fp-bottom": null,
      "crop-fp-pocket": null,
      "crop-np-back": null,
      "crop-np-front": null,
      "crop-np-bottom": null,
      "crop-sp-back": null,
      "crop-sp-front": null,
      "crop-sp-bottom": null,
      "crop-sp-left-pocket": null,
      "crop-sp-right-pocket": null,
    },

    polo: {
      "collar": null,
      "button-one_2": null,
      "button-two_2": null,
      "long-sleeve-right-sleeve": null,
      "long-sleeve-left-sleeve": null,
      "long-sleeve-right-cuff": null,
      "long-sleeve-left-cuff": null,
      "short-sleeve-right": null,
      "short-sleeve-left": null,
      "crop-body-front": null,
      "crop-body-back": null,
      "crop-body-band": null,
      "reg-body_front": null,
      "reg-body_back": null,
      "reg-body_band": null,
    },
  },

  setCurrentMaterials: (meshType, key, material) => {
    set((state) => {
      return {
        currentMaterials: {
          ...state.currentMaterials,
          [meshType]: {
            ...state.currentMaterials[meshType],
            [key]: material,
          },
        },
      };
    });
  },
}));
