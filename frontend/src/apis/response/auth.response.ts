import { BaseResponse } from ".";

interface ResAuthLogin extends BaseResponse {
    data: {
        username: string;
        accessToken: string;
    };
}

export type { ResAuthLogin };
