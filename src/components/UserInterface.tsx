import React from "react";
import { useSnapshot } from "valtio";
import { state } from "../store";
import { Leva } from "leva";

function UserInterface() {
  const snapshot = useSnapshot(state);

  return (
    <>
      <Leva />
    </>
  );
}

export default UserInterface;
