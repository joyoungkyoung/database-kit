import { Service } from "typedi";
import { UserModel } from "@models";
import { CustomException, errorInfo } from "@config";

@Service()
export default class AuthService {
    constructor() {}

    public async signup(dto: { username: string; password: string }) {
        const { username, password } = dto;

        const findUser = await UserModel.findOne({ username });
        if (findUser) throw new CustomException(errorInfo.DUPLICATED_USERNAME);

        const user = new UserModel({ username, password });

        const res = await user.save();
        return res;
    }

    public async login(dto: { username: string; password: string }) {
        const { username, password } = dto;

        const findUser = await UserModel.findOne({ username });
        if (!findUser) throw new CustomException(errorInfo.WRONG_USERNAME_OR_PASSWORD);

        const isMatch = await findUser.comparePassword(password);
        if (!isMatch) throw new CustomException(errorInfo.WRONG_USERNAME_OR_PASSWORD);

        return findUser && isMatch;
    }
}
