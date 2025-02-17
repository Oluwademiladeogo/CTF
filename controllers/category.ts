import { Request, Response } from 'express';
import Category from '../models/category';
import { ICategoryDoc } from '../types';
import { validateCategory } from '../validators/category';
import mongoose from 'mongoose';


export const createCategory = async (req: Request, res: Response): Promise<Response> => {
    const { name, imageUrl } = req.body;

    const { error } = validateCategory({ name, imageUrl });

    if (error) {
      return res.status(400).json({ success: false, details: error.details[0].message });
    }

    const newCategory = new Category({
      name,
      imageUrl,
    });

    const savedCategory = await newCategory.save();

    return res.status(201).json({ success: true, category: savedCategory });
};


export const getAllCategories = async (_req: Request, res: Response): Promise<void> => {
    const categories = await Category.find();

    res.status(200).json({ success: true, categories });
};


export const getCategoryById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) res.status(400).send({success: false, details: `${id} is not a valid ID`});

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ success: false, details: 'Category not found' });
    }

    return res.status(200).json({ success: true, category });
};


export const updateCategoryById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    if (!mongoose.isObjectIdOrHexString(id)) res.status(400).send({success: false, details: `${id} is not a valid ID`});

    const { name, imageUrl }: Partial<ICategoryDoc> = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ success: false, details: 'Category not found' });
    }

    return res.status(200).json({ success: true, category: updatedCategory });
};


export const deleteCategoryById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) res.status(400).send({success: false, details: `${id} is not a valid ID`});

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ success: false, details: 'Category not found' });
    }

    return res.status(200).json({ success: true, category: deletedCategory });
};
