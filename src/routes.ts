import { Express, Request, Response } from "express";
import { createServiceOrderHandler, getServiceOrderHandler, updateServiceOrderHandler } from "./controller/serviceOrder.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createTechnicianHandler } from "./controller/technician.controller";
import { createUserHandler } from "./controller/user.controller";
import { requireAdmin, requireTechnician, requireUser } from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createServiceOrderSchema, updateServiceOrderSchema } from "./schema/serviceOrder.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createTechnicianSchema } from "./schema/technician.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.get("/api/services", requireTechnician, getServiceOrderHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.post("/api/technicians",
    [requireAdmin, validateResource(createTechnicianSchema)],
    createTechnicianHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/services",
    [requireUser, validateResource(createServiceOrderSchema)],
    createServiceOrderHandler
  );

  app.put(
    "/api/services/:serviceOrderId",
    [requireUser, validateResource(updateServiceOrderSchema)],
    updateServiceOrderHandler
  );
}

export default routes;
