import React from "react";
import { useSelector } from "react-redux";

import { selectAllUsers } from "../../app/api/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  const users = useSelector(selectAllUsers);

  if (!users) {
    return <p>Loading...</p>;
  }

  return <NewNoteForm users={users} />;
};

export default NewNote;
