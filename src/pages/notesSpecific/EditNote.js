import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectNoteById } from "../../app/api/notesApiSlice";
import { selectAllUsers } from "../../app/api/usersApiSlice";
import EditNoteForm from "./EditNoteForm";

const EditNote = () => {
  const { id } = useParams();

  const note = useSelector((state) => selectNoteById(state, id));
  const users = useSelector(selectAllUsers);

  if (!note) {
    return <p>Loading...</p>;
  }

  return <EditNoteForm note={note} users={users} />;
};

export default EditNote;
