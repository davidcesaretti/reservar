import express, { Request, Response, NextFunction, Application } from "express";
import config from "./lib/config";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes/index";
import faker from "faker";
import { dataAirbnb } from "../db";
//import { createdTest } from "../test";
//-----------------------------------

interface error {
  status: number;
  message: string;
}

const app: Application = express();

app.use("/api", routes);
app.use(express.urlencoded({ extended: true, limit: "50mb" })); //middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(
  cors({
    origin: config.cors,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);

app.use((err: error, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
interface obj {
  image: string;
  city: string;
  price: string;
}
app.get("/", async (req: Request, res: Response) => {
  const imagen: any = faker.image.city();
  const ciudad: any = faker.address.cityName();
  const precio: any = faker.commerce.price();
  const imagen2 = faker.image.city();
  const ciudad2 = faker.address.cityName();
  const precio2 = faker.commerce.price();
  const imagen3 = faker.image.city();
  const ciudad3 = faker.address.cityName();
  const precio3 = faker.commerce.price();
  const imagen4 = faker.image.city();
  const ciudad4 = faker.address.cityName();
  const precio4 = faker.commerce.price();
  const imagen5 = faker.image.city();
  const ciudad5 = faker.address.cityName();
  const precio5 = faker.commerce.price();
  const imagen6 = faker.image.city();
  const ciudad6 = faker.address.cityName();
  const precio6 = faker.commerce.price();
  const imagen7 = faker.image.city();
  const ciudad7 = faker.address.cityName();
  const precio7 = faker.commerce.price();
  //  const objetoPrueba<obj[]> = {[{image, ciudad, precio},]}
  res.json([
    { imagen, ciudad, precio },
    { imagen: imagen2, ciudad: ciudad2, precio: precio2 },
    { imagen: imagen3, ciudad: ciudad3, precio: precio3 },
    { imagen: imagen4, ciudad: ciudad4, precio: precio4 },
    { imagen: imagen5, ciudad: ciudad5, precio: precio5 },
    { imagen: imagen6, ciudad: ciudad6, precio: precio6 },
    { imagen: imagen7, ciudad: ciudad7, precio: precio7 },
  ]);
});

app.get("/test", async (req: Request, res: Response) => {
  //  createdTest();
  dataAirbnb
    .find({})
    .limit(100)
    .then((data) => res.json(data));
});

export default app;
