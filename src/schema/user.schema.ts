import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - passwordConfirmation
 *        - firstName
 *        - lastName
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        passwordConfirmation:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    firstName: string()
      .min(2, " First name too short - should be 2 chars minimum")
      .max(40, "First name too long - should be 40 chars maximum")
      .optional(),
    lastName: string()
      .min(2, "Last name too short - should be 2 chars minimum")
      .max(40, "Last name too long - should be 40 chars maximum")
      .optional(),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"]
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;