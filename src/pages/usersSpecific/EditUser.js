import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserById } from "../../app/api/usersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  if (!user) {
    return <p>Loading...</p>;
  }

  return <EditUserForm user={user} />;
};

export default EditUser;
