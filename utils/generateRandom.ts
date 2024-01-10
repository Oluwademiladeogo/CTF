import crypto from 'crypto';
export const generateRandomString = (length: number) => {
    let string: any = crypto.randomBytes(length);
    string = string.toString('hex');
    return string;
};
export const generateOTP = (length: number) => {
    const otp = Math.floor(100000 + Math.random() * 900000)
        .toString()
        .slice(0, length);
    return otp;
};
