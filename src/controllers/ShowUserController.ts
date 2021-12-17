import { Request, Response } from "express";
import { ShowUserService } from "../services/ShowUserService";


export class ShowUserController {

 async showOne(req: Request, res: Response) {
  const { name } = req.body;

  const showUserService = new ShowUserService();

  const result = await showUserService.findByName({ name });

  if (result instanceof Error) return res.status(400).json(result.message);

  return res.json(result);

 }

 async showAll(req: Request, res: Response) {

  const showUserService = new ShowUserService();

  const result = await showUserService.findAll();

  if (result instanceof Error) return res.status(400).json(result.message);

  return res.json(result);

 }
}