import express, { Request, Response, NextFunction } from "express";
import validator from "validator";
import * as controller from "../controller/lookupController";
import { AppError } from "../middlewares/AppError";

const router = express.Router();

router.post(
  "/lookup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { url } = req.body;
      if (!url) {
        throw new AppError(400, "required field: URL");
      }

      if (!validator.isURL(url)) {
        throw new AppError(400, "not a valid URL");
      }

      const details = await controller.getDetails(url);

      if (!details) {
        res.status(200).send({ message: "No details found" });
      } else {
        res.status(200).send({ data: { details: details } });
      }
    } catch (e) {
      next(e);
      return;
    }
  }
);

export default router;
