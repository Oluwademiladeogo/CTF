import mongoose from "mongoose";
import { CategoryDoc } from "../types";

const categorySchema = new mongoose.Schema<CategoryDoc>({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    imageUrl: {
        type: String
    }
});

const Category = mongoose.model<CategoryDoc>('Category', categorySchema);

export default Category;