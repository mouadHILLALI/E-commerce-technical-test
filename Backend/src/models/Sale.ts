import mongoose, { Schema, Document } from 'mongoose';

export interface ISale extends Document {
  productId: string;
  quantity: number;
  totalPrice: number;
  date: Date;
}

const SaleSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<ISale>('Sale', SaleSchema);
