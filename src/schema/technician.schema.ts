import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Technian:
 *       type: object
 *       required:
 *        - email
 *       properties:
 *         email:
 *           type: string
 */

export const createTechnicianSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).email("Not a valid email")
    }),
});

export type CreateTechnicianInput = TypeOf<typeof createTechnicianSchema>;