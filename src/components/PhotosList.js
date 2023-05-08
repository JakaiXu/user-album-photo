import React from "react";
import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotoItem from "./PhotoItem";
const PhotosList = ({ album }) => {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();
  const photoAddClick = () => {
    addPhoto(album);
  };
  let content;
  if (isFetching) {
    content = <Skeleton times={3} className="h-10 w-full" />;
  } else if (error) {
    content = <div>Error Loading Photos.</div>;
  } else {
    content = data.map((photo) => {
      return (
        <div className="mr-2 mb-2">
          <PhotoItem photo={photo} key={photo.id} />
        </div>
      );
    });
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos In {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={photoAddClick}>
          +Add Photo
        </Button>
      </div>
      <div className="flex flex-row m-8 flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
};

export default PhotosList;
