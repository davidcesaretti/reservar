import express, { Response, Request, Router, NextFunction } from "express";
import { Properties } from "../models/Properties";
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
  });
  await property.save();
  return;
});

export default router;