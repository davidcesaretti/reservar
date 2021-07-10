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
    console.log(req.query.amenities);
    dataAirbnb

      .find({ amenities: req.query.amenities })
      .then((data) => res.json(data));
  }
  if (req.query.score) {
    let score: any = req.query.score;
    let scoreint: any = parseInt(score);
    dataAirbnb.find({ score: scoreint }).then((data) => res.json(data));
  }
  if (req.query.bedrooms) {
    let bedrooms: any = req.query.bedrooms;
    let bedroomsint: any = parseInt(bedrooms);
    dataAirbnb.find({ bedrooms: bedroomsint }).then((data) => res.json(data));
  }
  if (req.query.accommodates) {
    let accommodates: any = req.query.accommodates;
    let accommodatesint: any = parseInt(accommodates);
    dataAirbnb
      .find({ accommodates: accommodatesint })
      .then((data) => res.json(data));
  }
  if (req.query.beds) {
    let beds: any = req.query.beds;
    let bedsint: any = parseInt(beds);
    dataAirbnb.find({ beds: bedsint }).then((data) => res.json(data));
  }
});

export default router;
