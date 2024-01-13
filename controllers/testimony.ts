import { Request, Response } from 'express';
import Testimony from '../models/testimonies';
import { TestimonyDto } from '../dto/testimony.dto';
import { validateTestimony, validateUpdatedTestimony } from '../validators/testimony';


export const createTestimony = async (req: Request, res: Response): Promise<void> => {
    const {error} = validateTestimony(req.body);

    if (error) res.status(400).send({details: error.details[0].message})

    const { title, content, user, attachments }: TestimonyDto = req.body;

    const newTestimony = new Testimony({
        title,
        content,
        user,
        attachments,
    });

    const savedTestimony = await newTestimony.save();

    res.status(201).json({ success: true, testimony: savedTestimony });
};


export const getAllTestimonies = async (_req: Request, res: Response): Promise<void> => {
    const testimonies = await Testimony.find().populate('user').exec();

    res.status(200).json({ success: true, testimonies });
};

export const getTestimonyById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const testimony = await Testimony.findById(id).populate('user').exec();

    if (!testimony) {
        res.status(404).json({ success: false, error: 'Testimony not found' });
        return;
    }

    res.status(200).json({ success: true, testimony });
};


export const updateTestimonyById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const {error} = validateUpdatedTestimony(req.body);

  if (error) res.status(400).send({success: false, details: error.details[0].message});

  const { title, content, attachments }: Partial<TestimonyDto> = req.body;

  const updatedTestimony = await Testimony.findByIdAndUpdate(
      id,
      { title, content, attachments },
      { new: true }
   ).populate('user').exec();

    if (!updatedTestimony) {
        res.status(404).json({ success: false, error: 'Testimony not found' });
        return;
    }

    res.status(200).json({ success: true, testimony: updatedTestimony });
};

export const deleteTestimonyById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const deletedTestimony = await Testimony.findByIdAndDelete(id).populate('user').exec();

    if (!deletedTestimony) {
      res.status(404).json({ success: false, error: 'Testimony not found' });
      return;
    }

    res.status(200).json({ success: true, });
};
