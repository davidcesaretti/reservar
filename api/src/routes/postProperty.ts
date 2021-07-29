import express, { Response, Request, Router, NextFunction } from "express";
import { Properties } from "../models/Properties";
import { User } from "../models/Users";
import multer from "multer";

const path = require("path");
// import cors from "cors";
// import config from "../lib/config";
const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const router = Router();

router.use(
  multer({
    storage,
    dest: "public/uploads",
    fileFilter: (req, file, cb: any) => {
      const filetypes = /jpeg|jpg|png|svg/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(" Archivo debe ser imagen valida");
    },
  }).single("image")
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  let {
    name,
    summary,
    type,
    accommodates,
    beds,
    bedrooms,
    bathrooms,
    amenities,
    price,
    image,
    address,
    city,
    score,
    coordinates,
    host,
  } = req.body;
  const property = await new Properties({
    name,
    summary,
    type,
    accommodates,
    available: [],
    beds,
    bedrooms,
    bathrooms,
    amenities,
    price,
    city: city.toLowerCase(),
    image,
    score,
    address,
    coordinates,
    host,
  });
  await property.save();
  return;
});

router.post("/find", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const find = await Properties.find({ host: email });
    // console.log(find);
    res.json(find);

    return;
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/edit",
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      summary,
      type,
      accommodates,
      beds,
      bedrooms,
      bathrooms,
      amenities,
      price,
      image,
      address,
      city,
      score,
      coordinates,
      id,
    } = req.body;

    const properyUpdate = await Properties.updateOne(
      { _id: id },
      {
        $set: {
          name,
          summary,
          type,
          accommodates,
          beds,
          bedrooms,
          bathrooms,
          amenities,
          price,
          image,
          address,
          city,
          coordinates,
          score,
        },
      }
    );
    res.json(properyUpdate);
  }
);

router.get(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deleteProperty = await Properties.deleteOne({ _id: id });
    res.send("Propiedad borrada");
  }
);

export default router;
