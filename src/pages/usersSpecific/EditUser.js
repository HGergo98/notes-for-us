import React from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetUsersQuery } from "../../app/api/usersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) {
    return <PulseLoader color={"#FFF"} />;
  }

  return <EditUserForm user={user} />;
};

export default EditUser;
