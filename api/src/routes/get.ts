import express, { Response, Request, Router, NextFunction } from "express";
import { dataAirbnb } from "../../db";
// import cors from "cors";
// import config from "../lib/config";
const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  if (req.query.type) {
    console.log(req.query);
  }
  dataAirbnb.find({ type: "House" }).then((data) => res.json(data));
});

export default router;
