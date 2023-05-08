import React from "react";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";
const AlbumListItem = ({ album }) => {
  const [removeAlbum, removeAlbumResults] = useRemoveAlbumMutation();
  const removeAlbumHandle = () => {
    removeAlbum(album);
  };
  const header = (
    <div className="m-2 flex flex-row justify-between items-center bg-yellow-200">
      <Button
        className="mr-3"
        onClick={removeAlbumHandle}
        loading={removeAlbumResults.isLoading}
      >
        <GoTrashcan />
      </Button>
      {album.title}
    </div>
  );
  return (
    <ExpandablePanel header={header}>
      <div className="bg-orange-400">
        <PhotosList album={album} />
      </div>
    </ExpandablePanel>
  );
};

export default AlbumListItem;
