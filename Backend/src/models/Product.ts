import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  dateAdded: Date;
  sales: number;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  dateAdded: { type: Date, required: true },
  sales: { type: Number, default: 0 },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
