import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ServiceOrderInput {
    user: UserDocument["_id"];
    description?: string;
    contactPhone: string;
    scheduledDate: string;
    isSolved?: boolean;
}

export interface ServiceOrderDocument extends ServiceOrderInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const serviceOrderSchema = new mongoose.Schema(
    {
        serviceOrderId: {
            type: String,
            required: true,
            unique: true,
            default: () => `serviceOrder_${nanoid()}`,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        description: { type: String, required: false },
        contactPhone: { type: String, required: true },
        scheduledDate: { type: Date, required: true },
        isSolved: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    }
);

const ServiceOrderModel = mongoose.model<ServiceOrderDocument>("ServiceOrder", serviceOrderSchema);

export default ServiceOrderModel;
