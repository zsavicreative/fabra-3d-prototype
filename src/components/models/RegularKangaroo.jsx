import { useGLTF } from "@react-three/drei";
import { useGetTexture } from "../../utils";
import { useSnapshot } from "valtio";
import { state } from "../../store";
import { DoubleSide, MeshPhysicalMaterial } from "three";

export function RegularKangaroo(props) {
  const { nodes, materials } = useGLTF("/assets/models/hoodie.glb");
  console.log("nodes:", nodes);
  const snapshot = useSnapshot(state);
  const texture = useGetTexture(snapshot);
  const material = new MeshPhysicalMaterial(texture);
  material.side = DoubleSide;
  // const material = materials["Mat_0.001"];

  return (
    <group {...props} dispose={null} scale={0.01} rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_1_7_0_Inside.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_1_7_0_Inside_1.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_8_4_0_Inside.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_8_4_0_Inside_1.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_0_6_0_Outside001.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_0_6_0_Outside001_1.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_7_10_0_Outside001.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_7_10_0_Outside001_1.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_2_0_0_Inside.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_2_0_0_Inside_1.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_2_1_0_Outside001.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_2_1_0_Outside001_1.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_4_2_0_Outside001.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_4_2_0_Outside001_1.geometry}
        material={material}
      />

      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_4_3_0_Outside001.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_4_3_0_Outside001_1.geometry}
        material={material}
      />

      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_6_11_0_Inside.geometry}
        material={material}
      />
      <mesh
        castShadow
        geometry={nodes.Design_Piece_mat_Shape_6_11_0_Inside_1.geometry}
        material={material}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/reg-kangaroo.glb");
