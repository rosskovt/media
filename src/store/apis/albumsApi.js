import { faker } from '@faker-js/faker';
//IMPORTANT TO IMPORT FROM '@reduxjs/toolkit/query/react'; and NOT from '@reduxjs/toolkit/query'; !!!
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//DEV only
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const albumsApi = createApi({
    reducerPath: "albums",
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
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'UsersAlbums', id: user.id }]
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName(),
                        },
                    };
                },
            }),
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'Album', id: album.id }]
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE',
                    };
                },
            }),
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map((album) => {
                        return { type: "Album", id: album.id };
                    });
                    tags.push({ type: "UsersAlbums", id: user.id });
                    return tags;
                },
                query: (user) => {
                    return {
                        url: 'albums',
                        params: {
                            userId: user.id,
                        },
                        method: 'GET',
                    };
                }
            })
        };
    }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };