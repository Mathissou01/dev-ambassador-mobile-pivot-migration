import {ambassadorApi} from "@/redux/API/ambassadorApi";
import {type ApiResponseArray} from "@/types/ApiResponse";
import {Archive, type ArchiveType} from "@/hooks/API/ObjectTypes/Archive"; // Define a service using a base URL and expected endpoints

const URL = "archives";

export const ArchivesApiExtension = ambassadorApi.injectEndpoints({
    endpoints: (builder) => ({
        getArchives: builder.query<Archive[], void>({
            query: () => `/${URL}`,
            providesTags: (response = [], error, arg) => [
                "Archive",
                ...response.map(({_id}) => ({type: "Archive" as const, id: _id})),
            ],
            transformResponse: (response: ApiResponseArray<ArchiveType>, meta, arg) =>
                response.result.map((p) => new Archive(p)),
        }),
        getArchivesByUser: builder.query<Archive[], string | undefined>({
            query: (userID) => `/${URL}/user/${userID ?? ""}`,
            providesTags: (response = [], error, arg) => [
                "Archive",
                ...response.map(({_id}) => ({type: "Archive" as const, id: _id})),
            ],
            transformResponse: (response: ApiResponseArray<ArchiveType>, meta, arg) =>
                response.result.map((p) => new Archive(p)),
        }),
        getArchive: builder.query<Archive, string>({
            query: (id) => `/${URL}/${id}`,
            providesTags: (result, error, arg) => [{type: "Archive", id: arg}],
            transformResponse: (response: ArchiveType, meta, arg) => new Archive(response),
        }),
    }),
});

export const {
    useGetArchivesQuery,
    useGetArchivesByUserQuery,
    useGetArchiveQuery,
} = ArchivesApiExtension;
