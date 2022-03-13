import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { CreateTechnicianInput } from "../schema/technician.schema";
import { createTechnian } from "../service/technician.service";
import logger from "../utils/logger";


export async function createTechnicianHandler(
    req: Request<{}, {}, CreateTechnicianInput["body"]>,
    res: Response
) {
    try {
        const user = await UserModel.findOne(
            { email: req.body.email });
        if (!user) {
            return res.sendStatus(404);
        }
        const technian = await createTechnian({ user: user._id, inquiries: [] });
        return res.send(technian);
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}