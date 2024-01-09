import { User } from '../models/users';
import { signupUserDto } from './user.dto';

export const signupUser = async (data: signupUserDto) => {
    try {
        const { first_name, last_name, email, phone_num, birthday } = data;
        let user = await User.findOne({ email: email });
        if (user) return { status: 409, message: 'User already registered' };
        user = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_num: phone_num,
            birthday: birthday,
        });
        await user.save();
        return { status: 201, message: user };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error' };
    }
};
