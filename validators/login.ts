import Joi, { ValidationResult } from 'joi';
import { loginUserDto } from "../dto/user.dto";

const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const validate = (data: loginUserDto): ValidationResult => {
  return Schema.validate(data);
}

export default validate;
