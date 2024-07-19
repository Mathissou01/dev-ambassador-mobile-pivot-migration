import { ambassadorApi } from "@/redux/API/ambassadorApi";
import {ApiResponse, type ApiResponseArray} from "@/types/ApiResponse";
import {Archive, type ArchiveType} from "@/hooks/API/ObjectTypes/Archive";
import {School, SchoolType} from "@/hooks/API/ObjectTypes/School";
import {SchoolsType} from "@/hooks/API/Repositories/Schools"; // Define a service using a base URL and expected endpoints

const URL = "schools";

export const SchoolsApiExtension = ambassadorApi.injectEndpoints({
    endpoints: (builder) => ({
        getSchools: builder.query<School[], void>({
            query: () => `/${URL}`,
            providesTags: (response = [], error, arg) => [
                "School",
                ...response.map(({ _id }) => ({ type: "School" as const, id: _id })),
            ],
            transformResponse: (response: ApiResponseArray<SchoolType>, meta, arg) =>
                response.result.map((p) => new School(p)),
        }),
        getSchool: builder.query<School, string>({
            query: (id) => `/${URL}/id/${id}`,
            providesTags: (result, error, arg) => [{ type: "School", id: arg }],
            transformResponse: (response: ApiResponse<SchoolType>, meta, arg) => new School(response.result),
        }),
        getSchoolByName: builder.query<School, string>({
            query: (name) => `/${URL}/name/${name}`,
            providesTags: (result, error, arg) => [{ type: "School", id: arg }],
            transformResponse: (response: ApiResponse<SchoolType>, meta, arg) => new School(response.result),
        }),
    }),
});

export const {
    useGetSchoolsQuery,
    useGetSchoolQuery,
    useGetSchoolByNameQuery,
} = SchoolsApiExtension;
