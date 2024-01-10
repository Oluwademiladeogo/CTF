import crypto from 'crypto';
export const generateRandomString = (length: number) => {
    let string: any = crypto.randomBytes(length);
    string = string.toString('hex');
    console.log(string);
};
