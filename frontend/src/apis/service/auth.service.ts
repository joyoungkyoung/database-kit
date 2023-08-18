import { post } from "@/apis/instance";
import Endpoint from "@/constants/Endpoint";
import { ResAuthLogin } from "../response/auth.response";
import { ReqAuthLogin } from "../request/auth.request";
import { useMutation } from "react-query";

export const useLoginMutation = () => {
    return useMutation((data: ReqAuthLogin) => post<ResAuthLogin>(Endpoint.AuthLogin, data), {
        onSuccess: () => {},
    });
};
