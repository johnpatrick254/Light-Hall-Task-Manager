import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const toDoApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://light-hall-task-manager-ksjx.vercel.app/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("authorization", `Bearer ${token}`);
    },
  }),
  tagTypes:['Todos'],
  endpoints: (builder) => ({
    fetchAllToDos: builder.query({
      query: () => "api",
      providesTags:['Todos']
    }),
    
    fetchOneToDo: builder.query({
      query: (id) => `api/${id}`,
      invalidatesTags:['Todos']
    }),
    addToDo: builder.mutation({
      query: (todo) => ({ url: `api`, method: "post", body: todo }),
      invalidatesTags:['Todos']

    }),
    updateToDo: builder.mutation({
      query: (todo) => ({ url: `api/${todo.id}`, method: "put", body: todo.data }),
      invalidatesTags:['Todos']

    }),
    deleteToDo: builder.mutation({
      query: (id) => ({ url: `api/${id}`, method: "delete" }),
      invalidatesTags:['Todos']
    }),
  }),
});

export const {
  useFetchAllToDosQuery,
  useFetchOneToDoQuery,
  useAddToDoMutation,
  useUpdateToDoMutation,
  useDeleteToDoMutation,
} = toDoApi;
