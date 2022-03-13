import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface AdminDocument {
    user: UserDocument["_id"];
}

const adminSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User", unique: true },
    },
    {
        timestamps: true,
    }
);

const AdminModel = mongoose.model<AdminDocument>("Admin", adminSchema);

export default AdminModel;