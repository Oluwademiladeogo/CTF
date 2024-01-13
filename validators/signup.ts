import Joi, { ValidationResult } from 'joi';
import { signupUserDto } from "../dto/user.dto";

const Schema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    phone_num: Joi.number().min(10).required(),
    email: Joi.string().email().required(),
    birthday: Joi.date(),
    password: Joi.string().min(5).required(),
    repeat_password: Joi.ref("password"),
});

export const validate = (data: signupUserDto): ValidationResult => {
  return Schema.validate(data);
}

export default validate;
