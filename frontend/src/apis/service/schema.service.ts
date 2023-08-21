import { useQuery } from "react-query";
import { get } from "../instance";
import Endpoint from "@/constants/Endpoint";
import { ResGetSchemaList } from "../response/schema.response";
import { useAccessToken } from "@/stores/user";

export const useGetSchemaListQuery = (req?: { keyword?: string }) => {
    const accessToken = useAccessToken();
    return useQuery([Endpoint.GetSchemaList, req?.keyword], () =>
        get<ResGetSchemaList>(Endpoint.GetSchemaList, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: req && req,
        }).then(({ data }) => data.data)
    );
};
