import React, {  Fragment} from "react";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import useThunk from "../hook/useThunk";
import ExpandablePanel from "./ExpandablePanel";
import AlumsList from "./AlumsList";
const UsersListItem = ({ user }) => {
  const [doRemoveUser, isLoadingDeleteUser, removeError] = useThunk(removeUser);
  const removeUserHandle = () => {
    doRemoveUser(user);
  };
  const header = (
    <Fragment>
      {" "}
      <Button
        onClick={removeUserHandle}
        loading={isLoadingDeleteUser}
        className="mr-3"
      >
        <GoTrashcan className="hover-cursor" />
      </Button>
      {removeError && <div>Error deleting user.</div>}
      {user.name}
    </Fragment>
  );
  return <ExpandablePanel header={header}><AlumsList user={user}/></ExpandablePanel>;
};

export default UsersListItem;
