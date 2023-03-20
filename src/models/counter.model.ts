import mongoose, { Schema, type Document } from 'mongoose';

interface Counter extends Document {
    name: string;
    count: number;
}

const counterSchema = new Schema<Counter>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        count: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<Counter>('Counter', counterSchema);
