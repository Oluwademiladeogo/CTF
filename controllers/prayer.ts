import { Request, Response } from 'express';
import Prayer from '../models/prayers';
import { PrayerDoc } from '../types';
import { validatePrayer, validatePrayerUpdate } from '../validators/prayer';
import mongoose from 'mongoose';

export const createPrayer = async (req: Request, res: Response): Promise<Response> => {
    const { title, url, startDate, endDate, frequency } = req.body;

    const { error } = validatePrayer({ title, url, startDate, endDate, frequency });

    if (error) {
        return res.status(400).json({ success: false, details: error.details[0].message });
    }

    const newPrayer = new Prayer({
        title,
        url,
        startDate,
        endDate,
        frequency,
    });

    const savedPrayer = await newPrayer.save();

    return res.status(201).json({ success: true, prayer: savedPrayer });
};

export const getAllPrayers = async (_req: Request, res: Response): Promise<Response> => {
    const prayers = await Prayer.find();
    return res.status(200).json({ success: true, prayers });
};

export const getPrayerById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).send({ success: false, details: `${id} is not a valid ID` });

    const prayer = await Prayer.findById(id);

    if (!prayer) {
        return res.status(404).json({ success: false, details: 'Prayer not found' });
    }

    return res.status(200).json({ success: true, prayer });
};

export const updatePrayerById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).send({success: false, details: `${id} is not a valid ID`});

    const updateFields: Partial<PrayerDoc> = req.body;
    const { error } = validatePrayerUpdate(updateFields);

    if (error) {
      return res.status(400).json({ success: false, error: error.details[0].message });
    }

    const { title, url, startDate, endDate, frequency }: Partial<PrayerDoc> = req.body;

    const updatedPrayer = await Prayer.findByIdAndUpdate(
      id,
      { title, url, startDate, endDate, frequency },
      { new: true }
    );

    if (!updatedPrayer) {
      return res.status(404).json({ success: false, error: 'Prayer not found' });
    }

    return res.status(200).json({ success: true, prayer: updatedPrayer });
};


export const deletePrayerById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).send({success: false, details: `${id} is not a valid ID`});

    const deletedPrayer = await Prayer.findByIdAndDelete(id);

    if (!deletedPrayer) {
      return res.status(404).json({ success: false, error: 'Prayer not found' });
    }

    return res.status(200).json({ success: true });
};
