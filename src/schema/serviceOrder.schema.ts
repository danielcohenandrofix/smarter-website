import { object, string, TypeOf, date, boolean } from "zod";
import { activityTime, validTime } from "../middleware/validateTime";

/**
 * @openapi
 * components:
 *   schema:
 *     Service:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */

const PhoneRegExp: RegExp = new RegExp(/^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/gm);

const payload = {
    body: object({
        description: string()
            .max(400, "Description should be at most 400 characters long")
            .optional(),
        contactPhone: string({
            required_error: "Phone number is required",
        }).regex(PhoneRegExp),
        scheduledDate: string({
            required_error: "Scheduled Date is required",
        }).refine((data) => validTime(data), {
            message: "The date is not in the correct format",
            path: ["scheduledDate"],
        }).refine((data) => activityTime(data), {
            message: "Selected time outside business hours",
            path: ["scheduledDate"],
        }),
        isSolved: boolean({
            required_error: "Fault Status is required",
        }).optional(),
    }),
};

const editPayload = {
    body: object({
        description: string()
            .max(400, "Description should be at most 400 characters long")
            .optional(),
        contactPhone: string({
            required_error: "Phone number is required",
        }).regex(PhoneRegExp)
            .optional(),
        scheduledDate: string({
            required_error: "Scheduled Date is required",
        }).optional(),
        isSolved: boolean({
            required_error: "Fault Status is required",
        }).optional(),
    }),
};

const params = {
    params: object({
        serviceOrderId: string({
            required_error: "serviceOrderId is required",
        }),
    }),
};

export const createServiceOrderSchema = object({
    ...payload,
});

export const updateServiceOrderSchema = object({
    ...editPayload,
    ...params,
});

export const deleteServiceOrderSchema = object({
    ...params,
});

export const getServiceOrderSchema = object({
    ...params,
});

export type CreateServiceOrderInput = TypeOf<typeof createServiceOrderSchema>;
export type UpdateServiceOrderInput = TypeOf<typeof updateServiceOrderSchema>;
export type ReadServiceOrderInput = TypeOf<typeof deleteServiceOrderSchema>;
export type DeleteServiceOrderInput = TypeOf<typeof getServiceOrderSchema>;