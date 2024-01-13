import { Request, Response } from 'express';
import Testimony from '../models/testimonies';
import { TestimonyDto } from '../dto/testimony.dto';
import { validateTestimony, validateUpdatedTestimony } from '../validators/testimony';
import mongoose from 'mongoose';


export const createTestimony = async (req: Request, res: Response): Promise<Response> => {
    const {error} = validateTestimony(req.body);

    if (error) return res.status(400).send({details: error.details[0].message})

    const { title, content, testifier, attachments }: TestimonyDto = req.body;

    const newTestimony = new Testimony({
        title,
        content,
        testifier,
        attachments,
    });

    const savedTestimony = await newTestimony.save();

    return res.status(201).json({ success: true, testimony: savedTestimony });
};


export const getAllTestimonies = async (_req: Request, res: Response): Promise<void> => {
    const testimonies = await Testimony.find().populate("testifier", "email firstname").exec();

    res.status(200).json({ success: true, testimonies });
};

export const getTestimonyById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).send({success: false, details: `${id} is not a valid ID`});

    const testimony = await Testimony.findById(id).populate("testifier", "email").exec();

    if (!testimony) {
        return res.status(404).json({ success: false, details: 'Testimony not found' });
    }

    return res.status(200).json({ success: true, testimony });
};


export const updateTestimonyById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).send({success: false, details: `${id} is not a valid ID`});

  const {error} = validateUpdatedTestimony(req.body);

  if (error) return res.status(400).send({success: false, details: error.details[0].message});

  const { title, content, attachments }: Partial<TestimonyDto> = req.body;

  const updatedTestimony = await Testimony.findByIdAndUpdate(
      id,
      { title, content, attachments },
      { new: true }
   ).populate("testifier", "email").exec();

    if (!updatedTestimony) {
        return res.status(404).json({ success: false, details: 'Testimony not found' });
    }

    return res.status(200).json({ success: true, testimony: updatedTestimony });
};

export const deleteTestimonyById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).send({success: false, details: `${id} is not a valid ID`});

    const deletedTestimony = await Testimony.findByIdAndDelete(id).exec();

    if (!deletedTestimony) {
        return res.status(404).json({ success: false, details: 'Testimony not found' })
    }

    return res.status(200).json({ success: true, });
};
