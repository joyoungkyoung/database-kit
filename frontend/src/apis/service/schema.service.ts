import { useMutation, useQuery, useQueryClient } from "react-query";
import { get, post } from "../instance";
import Endpoint from "@/constants/Endpoint";
import { ResGetSchemaList, ResRemoveSchema } from "../response/schema.response";
import { useAccessToken } from "@/stores/auth";
import { ReqRemoveSchema } from "../request/schema.request";

export const useGetSchemaListQuery = (req?: { keyword?: string }) => {
    const accessToken = useAccessToken();
    return useQuery([Endpoint.GetSchemaList, req?.keyword], () =>
        get<ResGetSchemaList>(Endpoint.GetSchemaList, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: req && req,
        }).then(({ data }) => data.data)
    );
};

export const useRemoveSchemaMutation = () => {
    const accessToken = useAccessToken();
    const queryClient = useQueryClient();

    return useMutation(
        (data: ReqRemoveSchema) =>
            post<ResRemoveSchema>(
                Endpoint.RemoveSchema,
                { idList: [data._id] },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [Endpoint.GetSchemaList] });
            },
        }
    );
};
