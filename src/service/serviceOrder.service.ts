import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, {
    ProductDocument,
    ProductInput,
} from "../models/product.model";
import ServiceOrderModel, { ServiceOrderDocument, ServiceOrderInput } from "../models/serviceOrder.model";
import UserModel from "../models/user.model";

export async function createServiceOrder(input: ServiceOrderInput) {
    try {
        const result = await ServiceOrderModel.create(input);
        const s = await UserModel.updateOne(
            { _id: input.user },
            { $push: { inquiries: result._id } }
        );
        return result;
    } catch (e) {
        throw e;
    }
}

export async function findServiceOrder(
    query: FilterQuery<ServiceOrderDocument>,
    options: QueryOptions = { lean: true }
) {
    try {
        const result = await ServiceOrderModel.findOne(query, {}, options);
        return result;
    } catch (e) {

        throw e;
    }
}

export async function findAndUpdateServiceOrder(
    query: FilterQuery<ServiceOrderDocument>,
    update: UpdateQuery<ServiceOrderDocument>,
    options: QueryOptions
) {
    return ServiceOrderModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
    return ProductModel.deleteOne(query);
}
