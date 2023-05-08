import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const photoApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "AlbumsPhotos", id: album.id }];
        },
        query: (album) => {
          return {
            url: `/photos`,
            method: "POST",
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          console.log(result);
          const tags = result.map((photo) => {
            return {
              type: "Photo",
              id: photo.id,
            };
          });
          tags.push({ type: "AlbumsPhotos", id: album.id });
          return tags;
        },
        query: (album) => {
          return {
            url: "/photos",
            params: {
              albumId: album.id,
            },
            method: "GET",
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [
            {
              type: "Photo",
              id: photo.id,
            },
          ];
        },
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useAddPhotoMutation,
  useFetchPhotosQuery,
  useRemovePhotoMutation,
} = photoApi;
export { photoApi };
