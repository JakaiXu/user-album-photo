import React from "react";
import { useRemovePhotoMutation } from "../store";
import { GoTrashcan } from "react-icons/go";
const PhotoItem = ({ photo }) => {
  const [removePhoto] = useRemovePhotoMutation();
  const removePhotoHandle = () => {
    removePhoto(photo);
  };
  return (
    <div className="relative cursor-pointer">
      <img alt="photos" src={photo.url} className="h-20 w-20"></img>
      <div
        className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80"
        onClick={removePhotoHandle}
        
      >
        <GoTrashcan />
      </div>
    </div>
  );
};

export default PhotoItem;
