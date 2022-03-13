import { Request, Response, NextFunction } from "express";
import AdminModel from "../models/admin.model";
import TechnicianModel from "../models/technician.model";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export const requireTechnician = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  const result = await TechnicianModel.exists({ user: res.locals.user._id });

  if (!result) {
    return res.sendStatus(403);
  }

  return next();
};

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  const result = await AdminModel.exists({ user: res.locals.user._id });

  if (!result) {
    return res.sendStatus(403);
  }

  return next();
};