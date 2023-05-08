import React from "react";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";

import Button from "./Button";
import AlbumListItem from "./AlbumListItem";

const AlumsList = ({ user }) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  const addAlbumHandle = () => {
    addAlbum(user);
  };
  let content;

  if (isFetching) {
    content = <Skeleton times={3} className="h-10 w-full" />;
  } else if (error) {
    content = <div>Error Loading Albums.</div>;
  } else {
    content = data.map((album) => {
      return <AlbumListItem album={album} key={album.id} />;
    });
  }
  return (
    <div className="bg-gray-100">
      <div className="m-2 flex flex-row items-center justify-between bg-gray-200">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={addAlbumHandle}>
          Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlumsList;
