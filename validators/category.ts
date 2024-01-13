import Joi from 'joi';
import { CategoryDto } from '../dto/category.dto';

export const categorySchema = Joi.object({
  name: Joi.string().required(),
  imageUrl: Joi.string(),
});

export const validateCategory = (category: CategoryDto): Joi.ValidationResult => {
  return categorySchema.validate(category);
};
