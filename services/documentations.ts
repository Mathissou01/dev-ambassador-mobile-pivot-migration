import {ambassadorApi} from "@/redux/API/ambassadorApi";
import {type ApiResponseArray} from "@/types/ApiResponse";
import {Documentation, type DocumentationType} from "@/hooks/API/ObjectTypes/Documentation"; // Define a service using a base URL and expected endpoints

const URL = "documentations";

export const DocumentationsApiExtension = ambassadorApi.injectEndpoints({
    endpoints: (builder) => ({
        getDocumentations: builder.query<Documentation[], void>({
            query: () => `/${URL}/school`,
            providesTags: (response = [], error, arg) => [
                "Documentation",
                ...response.map(({_id}) => ({type: "Documentation" as const, id: _id})),
            ],
            transformResponse: (response: ApiResponseArray<DocumentationType>, meta, arg) =>
                response.result.map((p) => new Documentation(p)),
        }),
    }),
});

export const {
    useGetDocumentationsQuery,
} = DocumentationsApiExtension;
