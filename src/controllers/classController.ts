import { Response, Request } from "express";

export default class ClassController {
  postClass = async (req: Request, res: Response) => {
    try {
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
}
