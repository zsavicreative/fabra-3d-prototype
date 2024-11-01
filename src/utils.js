import { useTexture } from "@react-three/drei";
import { ClampToEdgeWrapping, RepeatWrapping } from "three";

export function useGetTexture(state) {
  const texturePath = `/assets/textures/texture-${state.colours[state.currentColour]}/textures`;

  const texture = useTexture({
    map: `${texturePath}/${state.colours[state.currentColour]}_base.jpg`,
    normalMap: `${texturePath}/${state.colours[state.currentColour]}_nrm.jpg`,
    roughnessMap: `${texturePath}/${state.colours[state.currentColour]}_rough.jpg`,
    displacementMap: `${texturePath}/${state.colours[state.currentColour]}_disp.jpg`,
  });

  for (const key in texture) {
    texture[key].wrapS = RepeatWrapping;
    texture[key].wrapT = RepeatWrapping;
    texture[key].repeat.set(20, 20);
  }

  return texture;
}
