import {ambassadorApi} from "@/redux/API/ambassadorApi";
import {ApiResponse, type ApiResponseArray} from "@/types/ApiResponse";
import {ArchivePost, type ArchivePostType} from "@/hooks/API/ObjectTypes/ArchivePost"; // Define a service using a base URL and expected endpoints

const URL = "archivePosts";

export const storiesApiExtension = ambassadorApi.injectEndpoints({
    endpoints: (builder) => ({
        getStories: builder.query<ArchivePost[], void>({
            query: () => `/${URL}`,
            providesTags: (response = [], error, arg) => [
                "Story",
                ...response.map(({_id}) => ({type: "Story" as const, id: _id})),
            ],
            transformResponse: (response: ApiResponseArray<ArchivePostType>, meta, arg) =>
                response.result.map((p) => new ArchivePost(p)),
        }),
        getStory: builder.query<ArchivePost, string>({
            query: (id) => `/${URL}/${id}`,
            providesTags: (result, error, arg) => [{type: "Story", id: arg}],
            transformResponse: (response: ApiResponse<ArchivePostType>, meta, arg) => new ArchivePost(response.result),
        }),
        addStory: builder.mutation<ArchivePost, Partial<ArchivePost>>({
            query(body) {
                return {
                    url: `/${URL}`,
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: [{type: "Story", id: "LIST"}],
        }),
    }),
});

export const {
    useGetStoriesQuery,
    useGetStoryQuery,
    useAddStoryMutation,
} = storiesApiExtension;
