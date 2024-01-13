import { User } from '../models/users.model';
import { signupUserDto } from '../dto/user.dto';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import * as _ from "lodash";
import { otp } from '../models/otp';
import { generateOTP } from '../utils/generateRandom';
import { OTPLENGTH, sendOtp } from '../utils/otp';
import validate from '../validators/signup';

config();

export const signupUser = async (data: signupUserDto) => {
    const {error } = validate(data);

    if (error) return {status: 400, message: error.details[0].message}

    let { first_name, last_name, email, phone_num, birthday, password } = data;
    let user = await User.findOne({ email: email });

    if (user) return { status: 409, message: 'A user with this email already exists.' };

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // TOD0: WHy is a verify object passed into the User Model
    user = new User({
        first_name,
        last_name,
        email,
        phone_num,
        birthday,
        password,
        salt,
        verify: false,
    });
    
    const newotp = generateOTP(OTPLENGTH);

    const verifyOtp = new otp({
        email,
        otp: newotp,
    });

    await verifyOtp.save();
    await user.save();

    sendOtp(user.email);
    const details = _.pick(user, ["email", "first_name", "last_name", "_id"]);

    return { status: 201, message: details };
    //after receiving this message, redirect to verifyUserOtp, to be done in test
    //can also tell him that we need a domain name to actually send the otp to our user else it will all bounce
};