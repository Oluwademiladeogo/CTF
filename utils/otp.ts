import { otp } from '../models/otp.model';
import { User } from '../models/users.model';
import { generateOTP } from './generateRandom';
import { sendMail } from './sendMail';

export const sendOtp = async (email: string) => {
    try {
        let user = await otp.findOne({ email: email });
        if (!user) {
            const newotp = generateOTP(6);
            user = new otp({
                email: email,
                otp: newotp,
            });
            await user.save();
        }
        sendMail(
            user.email,
            'otp',
            `Your one time password is ${user.otp}\n\n`,
        );
        return { status: 200, message: 'OTP sent successfully' };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error' };
    }
};
export const verifyUserOtp = async (email: string, pass: string) => {
    try {
        let user = await otp.findOne({ email: email });
        if (user?.otp !== pass) return { status: 409, message: 'Wrong input' };
        user = await User.findOneAndUpdate({ email: email });
        return { status: 201, message: 'Email verified' };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error' };
    }
};
