import { NextFunction, Request, Response } from "express"
import { decode, verify } from "jsonwebtoken";


export const ensureAuthenticated = () => {

 return async (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) return res.status(401).json({ error: 'Token is missing' });

  const [, token] = authHeaders.split(" ");

  try {

   verify(token, process.env.SECRET_JWT);

   const { sub: user_id } = decode(token);

   req.user = {
    id: user_id.toString()
   }

   next();

  } catch (err) {
   return res.status(401).end();
  }


 }

}