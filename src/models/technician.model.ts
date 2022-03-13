import mongoose from "mongoose";
import { ServiceOrderDocument } from "./serviceOrder.model";
import { UserDocument } from "./user.model";

export interface TechnicianDocument {
    user: UserDocument["_id"];
    inquiries: ServiceOrderDocument["_id"][];
}

const technicianSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
        inquiries: { type: [mongoose.Schema.Types.ObjectId], ref: "ServiceOrder", default: [] }
    },
    {
        timestamps: true,
    }
);

const TechnicianModel = mongoose.model<TechnicianDocument>("Technician", technicianSchema);

export default TechnicianModel;