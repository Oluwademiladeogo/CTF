import Joi from 'joi';

export const prayerSchema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  frequency: Joi.object({
    value: Joi.number().required(),
    unit: Joi.string().valid('minutes', 'hours', 'days').required(),
  }).required(),
});

export const prayerUpdateSchema = Joi.object({
  title: Joi.string(),
  url: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  frequency: Joi.object({
    value: Joi.number(),
    unit: Joi.string().valid('minutes', 'hours', 'days'),
  }),
});

export const validatePrayerUpdate = (prayer: any): Joi.ValidationResult => {
  return prayerUpdateSchema.validate(prayer);
};

export const validatePrayer = (prayer: any): Joi.ValidationResult => {
  return prayerSchema.validate(prayer);
};
