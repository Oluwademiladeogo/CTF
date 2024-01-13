import Joi from 'joi';
import { TestimonyDto } from '../dto/testimony.dto';

const testimonySchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().max(1000),
  testifier: Joi.string().required(),
  attachments: Joi.array().items(Joi.string()),
});

const updateSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string().max(1000),
  attachments: Joi.array().items(Joi.string()),
});

export const validateUpdatedTestimony = (testimony: Partial<TestimonyDto>): Joi.ValidationResult => {
  return updateSchema.validate(testimony);
};

export const validateTestimony = (testimony: TestimonyDto): Joi.ValidationResult => {
  return testimonySchema.validate(testimony);
};
