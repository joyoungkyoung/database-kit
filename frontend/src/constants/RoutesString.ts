const RoutesString = {
    Home: "/",
    Login: "/login",
    Schema: "/schema",
    SchemaRows: '/schema/:id',
    Account: "/account",
};
export type RoutesPathType = typeof RoutesString[keyof typeof RoutesString]
export default RoutesString;
