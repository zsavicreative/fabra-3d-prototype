import { useTexture } from "@react-three/drei";
import { ClampToEdgeWrapping, RepeatWrapping } from "three";

export function useGetTexture(materialType) {
  const texturePath = `/assets/textures/texture-${materialType}/textures`;

  const texture = useTexture({
    map: `${texturePath}/${materialType}_base.jpg`,
    normalMap: `${texturePath}/${materialType}_nrm.jpg`,
    roughnessMap: `${texturePath}/${materialType}_rough.jpg`,
    displacementMap: `${texturePath}/${materialType}_disp.jpg`,
    metalnessMap: `${texturePath}/${materialType}_mtl.jpg`,
  });

  for (const key in texture) {
    texture[key].wrapS = RepeatWrapping;
    texture[key].wrapT = RepeatWrapping;
    texture[key].repeat.set(10, 10);
  }

  return texture;
}

// a function that will hide/show the relative parts of the model based on a type
export function hideShowParts(type, nodes) {
  for (const key in nodes) {
    if (key.includes(type)) {
      nodes[key].visible = true;
    } else {
      nodes[key].visible = false;
    }
  }
}
