import {UserData, UserProfile, UserRegister} from "../../utils/types";
import {base_url} from "../../utils/constants.ts";
import {RootState} from "../../app/store.ts";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const accountApi = createApi({
    reducerPath: "account",
    tagTypes: ['profile'],
    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
        prepareHeaders: (headers, {getState, endpoint}) => {
            if (endpoint === 'updateUser') {
                const token = (getState() as RootState).token;
                headers.set("Authorization", token);
            }
            return headers;
        }
    }),
    endpoints: builder => ({
        registerUser: builder.mutation<UserProfile, UserRegister>({
            query: user => ({
                url: '/register',
                method: 'POST',
                body: user
            })
        }),
        fetchUser: builder.query<UserProfile, string>({
            query: token => ({
                url: '/login',
                method: 'POST',
                headers: {
                    Authorization: token
                }
            }),
            providesTags: ['profile']
        }),
        updateUser: builder.mutation<UserProfile, {user: UserData, login: string}>({
            query: ({user, login}) => ({
                url: `/user/${login}`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: ['profile']
        }),
        changePassword: builder.mutation<void, { newPassword: string, token: string }>({
            query: ({newPassword, token}) => ({
                url: '/password',
                method: 'PATCH',
                headers: {
                    'X-Password': newPassword,
                    Authorization: token
                }
            }),
            invalidatesTags: ['profile']
        })
    })
})

export const {useChangePasswordMutation, useFetchUserQuery, useLazyFetchUserQuery, useUpdateUserMutation, useRegisterUserMutation} = accountApi