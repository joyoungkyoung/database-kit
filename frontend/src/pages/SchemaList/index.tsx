import { useAccessToken, useUsername } from "@/stores/user";
import { useEffect } from "react";

export default function SchemaList() {
    const username = useUsername();
    const accessToken = useAccessToken();

    useEffect(() => {
        console.log(username, accessToken);
    }, []);
    return <>Schema</>;
}
