import { Request, Response } from "express";
import { SessionService } from "../services/SessionsService";

export class SessionsController {
 async handle(req: Request, res: Response) {
  const { email, password } = req.body;

  const sessionService = new SessionService();
  const result = await sessionService.execute({ email, password });

  if (result instanceof Error) return res.status(400).json(result.message);

  return res.json(result);
 }
}