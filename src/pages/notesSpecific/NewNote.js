import React from "react";
import { PulseLoader } from "react-spinners";

import { useGetUsersQuery } from "../../app/api/usersApiSlice";
import useTitle from "../../hooks/useTitle";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  useTitle("Notes for Us | Add new note");
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) {
    return <PulseLoader color={"#FFF"} />;
  }

  return <NewNoteForm users={users} />;
};

export default NewNote;
