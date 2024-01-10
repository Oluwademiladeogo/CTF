import * as jwt from 'jsonwebtoken';
import { User } from '../models/users';
import { loginUserDto, signupUserDto } from './user.dto';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();
export const signupUser = async (data: signupUserDto) => {
    try {
        let { first_name, last_name, email, phone_num, birthday, password } =
            data;
        let user = await User.findOne({ email: email });
        if (user) return { status: 409, message: 'User already registered' };
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        user = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_num: phone_num,
            birthday: birthday,
            password: password,
            salt: salt,
        });
        await user.save();
        return { status: 201, message: user };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error' };
    }
};
export const loginUser = async (data: loginUserDto) => {
    let { email, password } = data;
    let user = await User.findOne({ email: email });
    if (!user) return { status: 401, message: 'Incorrect email or password' };

    try {
        await bcrypt.compare(password, user.password, async (err, result) => {
            if (!result)
                return { status: 302, message: 'Incorrect email or password' };
            if (err) return { status: 500, message: 'Internal Server Error' };
            if (result) {
                let payload = {
                    id: user?._id,
                    name: user?.first_name,
                    phone: user?.phone_num,
                };
                let secret: string = process.env.JWTKEY || '';
                let token = await jwt.sign(payload, secret);
                return {
                    status: 200,
                    message: 'Login successful',
                    token: token,
                };
            }
        });
    } catch (error) {
        return { status: 500, message: 'Internal Server Error' };
    }
};
