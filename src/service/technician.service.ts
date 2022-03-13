import TechnicianModel, { TechnicianDocument } from "../models/technician.model";

export async function createTechnian(input: TechnicianDocument) {
    try {
        const result = await TechnicianModel.create(input);
        return result;
    } catch (e) {
        throw e;
    }
}