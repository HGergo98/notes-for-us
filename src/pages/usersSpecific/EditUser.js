import React from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetUsersQuery } from "../../app/api/usersApiSlice";
import useTitle from "../../hooks/useTitle";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  useTitle("Notes for Us | Edit user");
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
