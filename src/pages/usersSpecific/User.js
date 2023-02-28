import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../app/api/usersApiSlice";

const User = ({ userId }) => {
  const navigate = useNavigate();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  if (!user) {
    return null;
  }

  const handleEdit = () => navigate(`/dashboard/users/${userId}`);
  const userRolesString = user.roles.toString().replaceAll(",", ", ");
  const cellStatus = user.active ? "" : "table__cell--inactive";

  return (
    <tr className="table__row user">
      <td className={`table__cell ${cellStatus}`}>{user.username}</td>
      <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
      <td className={`table__cell ${cellStatus}`}>
        <button
          className="icon-button table__button"
          onClick={handleEdit}
          title="Edit"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};

const memoizedUser = memo(User);

export default memoizedUser;
