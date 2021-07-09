import express, { Response, Request, Router, NextFunction } from "express";
import { any } from "sequelize/types/lib/operators";
import { dataAirbnb } from "../../db";
// import cors from "cors";
// import config from "../lib/config";
const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  if (req.query.type) {
    dataAirbnb.find({ type: req.query.type }).then((data) => res.json(data));
  }
  if (req.query.amenities) {
    dataAirbnb
      .find({ amenities: req.query.amenities })
      .then((data) => res.json(data));
  }
  if (req.query.score) {
    dataAirbnb.find({ score: req.query.score }).then((data) => res.json(data));
  }
});

export default router;
