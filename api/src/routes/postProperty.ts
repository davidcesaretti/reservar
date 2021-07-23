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
    host,
  });
  await property.save();
  return;
});

router.post(
  "/find",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const find = await Properties.find({ host: email });
    console.log(find);
    res.json(find);
  }
);

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
          score,
        },
      }
    );
    res.json(properyUpdate);
  }
);
export default router;
