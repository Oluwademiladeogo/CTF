export interface signupUserDto {
    first_name: string;
    last_name: string;
    email: string;
    phone_num: string;
    birthday: Date;
    password: string;
    salt: string;
}
export interface loginUserDto {
    email: string;
    password: string;
}
