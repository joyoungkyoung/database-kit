import { useQuery } from "react-query";
import { get } from "../instance";
import Endpoint from "@/constants/Endpoint";
import { ResGetSchemaList } from "../response/schema.response";
import { useAccessToken } from "@/stores/user";

export const useGetSchemaListQuery = () => {
    const accessToken = useAccessToken();
    return useQuery(Endpoint.GetSchemaList, () =>
        get<ResGetSchemaList>(Endpoint.GetSchemaList, {
            headers: { Authorization: `Bearer ${accessToken}` },
        }).then(({ data }) => data.data)
    );
};
