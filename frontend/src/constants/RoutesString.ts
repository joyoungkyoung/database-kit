const RoutesString = {
    Home: "/",
    Login: "/login",
    Schema: "/schema",
    Account: "/account",
};
export type RoutesPathType = typeof RoutesString[keyof typeof RoutesString]
export default RoutesString;
