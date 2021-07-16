import express, { Response, Request, Router, NextFunction } from "express";
import { dataAirbnb } from "../../db";
import { paginado } from "../paginado";
import { Properties } from "../models/Properties";
import { Reserva } from "../models/Users";
import { Propertiestests } from "../models/propertiestests";
// import cors from "cors";
// import config from "../lib/config";
const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  let { amenities, price, type } = req.query;
  let { fechaSalida, fechaLlegada } = req.body;
  const fechaBusqueda = {
    available: {
      $elemMatch: {
        $or: [
          {
            fechaSalida: {
              $gte: new Date(fechaSalida),
              $lte: new Date(fechaLlegada),
            },
          },
          {
            fechaLlegada: {
              $gte: new Date(fechaSalida),
              $lte: new Date(fechaLlegada),
            },
          },
        ],
      },
    },
  };
  if (
    req.query.page ||
    req.query.accommodates ||
    req.query.amenities ||
    req.query.score ||
    req.query.price ||
    req.query.type
  ) {
    let accommodates: any = req.query.accommodates;
    accommodates ? (accommodates = parseInt(accommodates)) : undefined;
    let score: any = req.query.score;
    score ? (score = parseInt(score)) : undefined;

    let obj = {};
    let array = [
      { score: score },
      { amenities: amenities },
      { type: type },
      { accommodates: accommodates },
    ];

    // console.log(typeof Object.values(array[1])[0], "invento");
    array = array.filter((x) => Object.values(x)[0] !== undefined);
    // console.log(array, "array filtrado");
    array.map((x) => Object.assign(obj, x));

    //  console.log(obj, "objeto logeado");

    if (Array.isArray(req.query.amenities)) {
      Properties.find({ amenities: { $all: req.query.amenities } }).then(
        (data) => res.json(paginado(req, res, data))
      );
      return;
    }
    if (fechaLlegada && fechaSalida) obj = { ...obj, ...fechaBusqueda };

    console.log(obj);
    if (price) {
      //Properties.find(obj)
      Propertiestests.find(obj)
        .sort({ price: req.query.price })
        .then((data: any) => res.json(paginado(req, res, data)))
        .catch((err) => console.error(err));
      return;
    }
    // Properties.find(obj)
    Propertiestests.find(obj)
      .then((data: any) => res.json(paginado(req, res, data)))
      .catch((err) => console.error(err));
    return;
  }
  //_________________
  if (req.body.fechaSalida && req.body.fechaLlegada) {
    Propertiestests.find(fechaBusqueda).then((data) => res.json(data));
    //______________

    // Propertiestests.aggregate([
    //   {
    //     $match: {
    //       available: {
    //         $or: [
    //           {
    //             fechaSalida: {
    //               $gte: new Date(fechaSalida),
    //               $lte: new Date(fechaLlegada),
    //             },
    //           },
    //           {
    //             fechaLlegada: {
    //               $gte: new Date(fechaSalida),
    //               $lte: new Date(fechaLlegada),
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   },
    // ]).then((data) => res.json(data));

    // Reserva.find({
    //   $or: [
    //     {
    //       fechaSalida: {
    //         $gte: new Date(fechaSalida),
    //         $lte: new Date(fechaLlegada),
    //       },
    //     },
    //     {
    //       fechaLlegada: {
    //         $gte: new Date(fechaSalida),
    //         $lte: new Date(fechaLlegada),
    //       },
    //     },
    //   ],
    // }).then((data) => res.json(data));
    //_________________
    return;
  }
  Properties.find({}).then((data: any) => res.json(paginado(req, res, data)));
});

router.get("/properties/:id", async (req: Request, res: Response) => {
  const idPropiedad = req.params.id;

  try {
    if (idPropiedad) {
      Properties.find({ _id: idPropiedad }).then((data) => res.json(data));
      return;
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
