type ErrorKeyType =
    | "UNAUTHORIZED"
    | "ACCESS_DENIED"
    | "DUPLICATED_USERNAME"
    | "WRONG_USERNAME_OR_PASSWORD"
    | "INVALID_PARAMETER_STRING_LEGNTH"
    | "INVALID_REQUIRE_PARAMETER";

const errorInfo: {
    [key in ErrorKeyType]: { code: string; message: string };
} = {
    UNAUTHORIZED: { code: "401", message: "401 unauthorized" },
    ACCESS_DENIED: { code: "403", message: "403 Access Denied" },
    DUPLICATED_USERNAME: { code: "10000", message: "username is duplicated" },
    WRONG_USERNAME_OR_PASSWORD: { code: "10001", message: "wrong username or password" },
    INVALID_PARAMETER_STRING_LEGNTH: { code: "90000", message: "name can not be more than {0} characters" },
    INVALID_REQUIRE_PARAMETER: { code: "90001", message: "must provide : {0}" },
};

function formatMsg(key: ErrorKeyType, values?: (string | number)[]) {
    const result = values?.reduce((acc: string, cur: string | number, curIdx: number) => {
        return acc.replace(`{${curIdx}}`, String(cur));
    }, errorInfo[key].message);

    return result;
}
export default { ...errorInfo, formatMsg };
