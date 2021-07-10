import express, { Response, Request, Router, NextFunction } from "express";
import { any } from "sequelize/types/lib/operators";
import { dataAirbnb } from "../../db";
import { paginado } from "../paginado";
// import cors from "cors";
// import config from "../lib/config";
const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  let { amenities, price, type } = req.query;
  if (
    req.query.amenities ||
    req.query.score ||
    req.query.price ||
    req.query.type
  ) {
    let score: any = req.query.score;
    score ? (score = parseInt(score)) : undefined;

    let obj = {};
    let array = [{ score: score }, { amenities: amenities }, { type: type }];

    console.log(typeof Object.values(array[1])[0], "invento");
    array = array.filter((x) => Object.values(x)[0] !== undefined);
    console.log(array, "array filtrado");
    array.map((x) => Object.assign(obj, x));

    console.log(obj, "objeto logeado");

    if (price) {
      dataAirbnb
        .find(obj)
        .sort({ price: req.query.price })
        .then((data: any) => res.json(paginado(req, res, data)))
        .catch((err) => console.error(err));
    }
    dataAirbnb
      .find(obj)
      .then((data: any) => res.json(paginado(req, res, data)))
      .catch((err) => console.error(err));
  }

  //   if (req.query.type) {
  //     dataAirbnb.find({ type: req.query.type }).then((data) => res.json(data));
  //   }

  //   if (req.query.amenities && req.query.score && req.query.price) {
  //     let score: any = req.query.score;
  //     score = parseInt(score);
  //     dataAirbnb
  //       .find({ score: score, amenities: req.query.amenities })
  //       .then((data) => res.json(data));
  //   }

  //   if (req.query.amenities) {
  //     if (Array.isArray(req.query.amenities)) {
  //       dataAirbnb
  //         .find({ amenities: { $all: req.query.amenities } })
  //         .then((data) => res.json(paginado(req, res, data)));
  //     }

  //     dataAirbnb
  //       .find({ amenities: req.query.amenities })
  //       .then((data) => res.json(paginado(req, res, data)));
  //   }

  //   if (req.query.score) {
  //     let score: any = req.query.score;
  //     score = parseInt(score);
  //     dataAirbnb.find({ score: score }).then((data) => res.json(data));
  //   }
  //   if (req.query.price) {
  //     dataAirbnb
  //       .find({})
  //       .sort({ price: req.query.price })
  //       .then((data) => res.json(data));
  //   }
});

export default router;
