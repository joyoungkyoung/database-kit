import { object, string } from "yup";

const schema = object().shape({
    username: string().required("username is required."),
    password: string().required("password is required."),
});

export default schema;
