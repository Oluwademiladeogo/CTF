import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();
export const sendMail = async (email: string, title: string, body: string) => {
    try {
        //until i find a way to put it in an env without throwing errors
        let transport = nodemailer.createTransport({
            host: 'smtp.elasticemail.com',
            port: 2525,
            secure: false,
            auth: {
                user: 'demiladebickersteth@gmail.com',
                pass: 'DF2A63AA1B66959A1DDD5EC15D6EE9B54D27',
            },
        });
        let info = await transport.sendMail({
            from: 'bickerstethdemilade@gmail.com',
            to: email,
            subject: title,
            text: body,
        });
        console.log('Sent info:', info);
    } catch (error) {
        console.log(error);
    }
};
