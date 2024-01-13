import { otp } from '../models/otp';
import { User } from '../models/users.model';
import { generateOTP } from './generateRandom';
import { sendMail } from './sendMail';

export const OTPLENGTH = 6;

export const sendOtp = async (email: string) => {
    let user = await otp.findOne({ email: email });

    if (user){
        // If the OTP for that user exists delete it
        await otp.deleteOne({email: email})
    }
    else{
        const newotp = generateOTP(OTPLENGTH);
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
};

export const verifyUserOtp = async (email: string, userProvidedOTP: string) => {
    let user_otp = await otp.findOne({ email: email });

    if (user_otp?.otp !== userProvidedOTP) return {
        status: 400,
        message: 'Wrong input' 
    };

    await User.findOneAndUpdate({ email: email });
    // delete the OTP from the DB
    await otp.deleteOne({email: email})
    return { status: 200, message: 'Email verified' };
};
