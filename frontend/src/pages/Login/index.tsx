import { Button, Container } from "@mui/material";
import "./style.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./login.schema";
import { FormInput } from "@/components";
import { useLoginMutation } from "@/apis/service/auth.service";
import { useUserActions } from "@/stores/user";
import { useNavigate } from "react-router-dom";
import RoutesString from "@/constants/RoutesString";

export default function Login() {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const { mutateAsync: reqLogin } = useLoginMutation();
    const { setUser } = useUserActions();
    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        reqLogin(data)
            .then(({ data: { code, data } }) => {
                if (code === 200) {
                    setUser(data.username, data.accessToken);
                    navigate(RoutesString.Schema);
                }
            })
            .catch((e) => {
                alert(e.response.data?.message);
            });
    };
    return (
        <Container className="login-container" maxWidth="sm">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <FormInput label="id" control={control} name="username" />
                <FormInput label="password" control={control} name="password" type="password" />

                <Button variant="contained" fullWidth type="submit">
                    로그인
                </Button>
            </form>
        </Container>
    );
}
