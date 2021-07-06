// import express, { Response, Request, Router, NextFunction } from "express";
// import { User } from "../models/User";
// // import cors from "cors";
// // import config from "../lib/config";
// const router = Router();

// router.use(express.json());
// router.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });
// router.get("/", (req: Request, res: Response, next: NextFunction) => {
//   User.findAll()
//     .then((users) => {
//       res.send(users);
//     })
//     .catch((error) => next(error));
// });

// router.post("/", (req: Request, res: Response, next: NextFunction) => {
//   const user = req.body;

//   User.create(user)
//     .then((createdUser) => {
//       res.send(createdUser);
//     })
//     .catch((error) => next(error));
// });

// router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { id, nombre } = req.body;
//     const eliminado: any = await User.findOne({
//       where: {
//         id: id,
//       },
//     });
//     await eliminado.destroy();
//     res.json(`usuario ${nombre} eliminado correctamente`);
//   } catch (error) {}
// });

// export default router;
