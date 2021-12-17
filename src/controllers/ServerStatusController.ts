import { Request, Response } from 'express';

export class ServerstatusController {

 async show(req: Request, res: Response) {


  return res.json({ Message: "Online", status: 1 });
 }

}