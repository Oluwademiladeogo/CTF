import mongoose from "mongoose";
import { ICategoryDoc } from "../types";

const categorySchema = new mongoose.Schema<ICategoryDoc>({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    imageUrl: {
        type: String
    }
});

const Category = mongoose.model<ICategoryDoc>('Category', categorySchema);

export default Category;