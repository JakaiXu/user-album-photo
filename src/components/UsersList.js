import React, { useEffect } from "react";
import Button from "./Button";
import { useSelector } from "react-redux";
import { addUsers, fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import useThunk from "../hook/useThunk";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUsers);

  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };
  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return (
        <UsersListItem user={user} key={user.id} />
       
      );
    });
  }

  return (
    <div className="bg-orange-100">
      <div className="flex flex-row justify-between m-3 ">
        <h1 className="m-2 text-xl">Users</h1>

        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>

        {creatingUserError && "Error creating user ..."}
      </div>
      {content}
    </div>
  );
};

export default UsersList;
