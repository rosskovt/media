import { faker } from '@faker-js/faker';
//IMPORTANT TO IMPORT FROM '@reduxjs/toolkit/query/react'; and NOT from '@reduxjs/toolkit/query'; !!!
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//DEV only
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const photosApi = createApi({
    reducerPath: "photos",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        //REMOVE FOR PRODUCTION. Only to overwrite a fetch function with an artificial pause 
        //to test out the button animation
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints(builder) {
        return {
            addPhoto: builder.mutation({
                //TODO tags
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'AlbumPhotos', id: album.id }]
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: {
                            albumId: album.id,
                            url: faker.image.abstract(150, 150, true),
                        },
                    };
                },
            }),
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    //TODO tags
                    return [{ type: 'Photo', id: photo.id }]
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE',
                    };
                },
            }),
            fetchPhotos: builder.query({
                //TODO tags
                providesTags: (result, error, album) => {
                    const tags = result.map((photo) => {
                        return { type: "Photo", id: photo.id };
                    });
                    tags.push({ type: "AlbumPhotos", id: album.id });
                    return tags;
                },
                query: (album) => {
                    return {
                        url: 'photos',
                        params: {
                            albumId: album.id,
                        },
                        method: 'GET',
                    };
                }
            })
        };
    }
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export { photosApi };