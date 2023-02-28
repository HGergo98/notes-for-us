import React from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";

import { useGetNotesQuery } from "../../app/api/notesApiSlice";
import { useGetUsersQuery } from "../../app/api/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import EditNoteForm from "./EditNoteForm";

const EditNote = () => {
  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users.length) {
    return <PulseLoader color={"#FFF"} />;
  }

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  return <EditNoteForm note={note} users={users} />;
};

export default EditNote;
