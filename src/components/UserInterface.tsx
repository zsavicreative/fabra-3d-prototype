import React from "react";
import { useSnapshot } from "valtio";
import { state } from "../store";
import { Leva, useControls } from "leva";

function UserInterface() {
  const snapshot = useSnapshot(state);

  return (
    <div className='w-[400px] absolute top-0 right-0'>
      <Leva fill />
    </div>
  );
}

export default UserInterface;
