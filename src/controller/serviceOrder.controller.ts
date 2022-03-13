import { Request, Response } from "express";
import { any } from "zod";
import ServiceOrderModel from "../models/serviceOrder.model";
import {
    UpdateProductInput,
} from "../schema/product.schema";
import { CreateServiceOrderInput, UpdateServiceOrderInput } from "../schema/serviceOrder.schema";
import {
    createProduct,
    deleteProduct,
    findAndUpdateProduct,
    findProduct,
} from "../service/product.service";
import { createServiceOrder, findAndUpdateServiceOrder, findServiceOrder } from "../service/serviceOrder.service";
import { findUser } from "../service/user.service";

export async function createServiceOrderHandler(
    req: Request<{}, {}, CreateServiceOrderInput["body"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const body = req.body;

    const serviceOrder = await createServiceOrder({ ...body, user: userId });

    return res.send(serviceOrder);
}

export async function updateServiceOrderHandler(
    req: Request<UpdateServiceOrderInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const serviceOrderId = req.params.serviceOrderId;
    const update = req.body;

    const serviceOrder = await findServiceOrder({ serviceOrderId });

    if (!serviceOrder) {
        return res.sendStatus(404);
    }

    if (String(serviceOrder.user) !== userId) {
        return res.sendStatus(403);
    }

    const updatedServiceOrder = await findAndUpdateServiceOrder({ serviceOrderId }, update, {
        new: true,
    });

    return res.send(updatedServiceOrder);
}

export async function getServiceOrderHandler(
    req: Request, res: Response
) {
    const orders = await ServiceOrderModel.find();
    let xxxx: any[] = [];
    orders.forEach(async element => {
        const user = await findUser({ id: element.user });
        xxxx.push({
            _id: element._id,
            firstName: user?.firstName,
            lasstName: user?.lastName,
            email: user?.email,
            description: element.description,
            contactPhone: element.scheduledDate,
            isSolved: element.isSolved,
        })
    })
    return res.send(orders);
}

export async function deleteProductHandler(
    req: Request<UpdateProductInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
        return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
        return res.sendStatus(403);
    }

    await deleteProduct({ productId });

    return res.sendStatus(200);
}