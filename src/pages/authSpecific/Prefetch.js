import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { store } from "../../app/store";
import { notesApiSlice } from "../../app/api/notesApiSlice";
import { usersApiSlice } from "../../app/api/usersApiSlice";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribing");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
