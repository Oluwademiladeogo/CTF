import { Request, Response } from 'express';
import Prayer from '../models/prayers';
import { PrayerDoc } from '../types';
import { validatePrayer, validatePrayerUpdate } from '../validators/prayer';


export const createPrayer = async (req: Request, res: Response): Promise<void> => {
    const { title, url, startDate, endDate, frequency } = req.body;

    const { error } = validatePrayer({ title, url, startDate, endDate, frequency });

    if (error) {
      res.status(400).json({ success: false, error: error.details[0].message });
      return;
    }

    const newPrayer = new Prayer({
      title,
      url,
      startDate,
      endDate,
      frequency,
    });

    const savedPrayer = await newPrayer.save();

    res.status(201).json({ success: true, prayer: savedPrayer });
};


export const getAllPrayers = async (_req: Request, res: Response): Promise<void> => {
    const prayers = await Prayer.find();
    res.status(200).json({ success: true, prayers });
};

export const getPrayerById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const prayer = await Prayer.findById(id);

    if (!prayer) {
      res.status(404).json({ success: false, error: 'Prayer not found' });
      return;
    }

    res.status(200).json({ success: true, prayer });
};

export const updatePrayerById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    const updateFields: Partial<PrayerDoc> = req.body;
    const { error } = validatePrayerUpdate(updateFields);

    if (error) {
        res.status(400).json({ success: false, error: error.details[0].message });
        return;
    }

    const { title, url, startDate, endDate, frequency }: Partial<PrayerDoc> = req.body;

    const updatedPrayer = await Prayer.findByIdAndUpdate(
      id,
      { title, url, startDate, endDate, frequency },
      { new: true }
    );

    if (!updatedPrayer) {
      res.status(404).json({ success: false, error: 'Prayer not found' });
      return;
    }

    res.status(200).json({ success: true, prayer: updatedPrayer });
};


export const deletePrayerById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const deletedPrayer = await Prayer.findByIdAndDelete(id);

    if (!deletedPrayer) {
      res.status(404).json({ success: false, error: 'Prayer not found' });
      return;
    }

    res.status(200).json({ success: true });
};
