import { proxy } from "valtio";

export const state = proxy({
  intro: false,

  colours: ["black", "white", "grey"],
  currentColour: 0,
});
