import { useTexture } from "@react-three/drei";
import { ClampToEdgeWrapping, DoubleSide, MeshPhysicalMaterial, RepeatWrapping } from "three";

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
    texture[key].repeat.set(6, 6);
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

export function createPBRMaterial(materialType) {
  const texture = useGetTexture(materialType);
  const material = new MeshPhysicalMaterial(texture);
  material.side = DoubleSide;
  material.displacementScale = 0.005;
  material.normalScale.set(2, 2);

  return material;
}
