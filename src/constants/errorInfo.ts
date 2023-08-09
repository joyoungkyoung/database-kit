type errorKeyType = "INVALID_PARAMETER_STRING_LEGNTH" | "INVALID_REQUIRE_PARAMETER";

const errorInfo: { [key in errorKeyType]: { code: string; message: string } } = {
    INVALID_PARAMETER_STRING_LEGNTH: { code: "90000", message: "name can not be more than {0} characters" },
    INVALID_REQUIRE_PARAMETER: { code: "90001", message: "must provide : {0}" },
};

function formatMsg(key: errorKeyType, values?: (string | number)[]) {
    const result = values?.reduce((acc: string, cur: string | number, curIdx: number) => {
        return acc.replace(`{${curIdx}}`, String(cur));
    }, errorInfo[key].message);

    return result;
}
export default { ...errorInfo, formatMsg };
