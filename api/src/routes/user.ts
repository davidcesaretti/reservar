import express, { Request, Response, NextFunction, Router } from "express";
import { User, Reserva } from "../models/Users";
import { Properties } from "../models/Properties";
import jwt from "jsonwebtoken";
import verifyToken from "../controllers/verifyToken";

//-------------------------------------------

const UserRouter = Router();
UserRouter.use(express.json());
const { SECRET_TOKEN } = process.env;

UserRouter.post("/register", async (req: Request, res: Response, next) => {
  const { name, email, photo } = req.body;

  console.log(name, "  NAME BACK");

  try {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      res.status(400).send("El email ya esta en uso");
    }
    const user = new User({
      name,
      email,
      photo,
    });
    await user.save();
    console.log(user, "   USER BACK");
    res.json(user);
  } catch (err) {
    res.send(err);
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send("The email doesn't exist");
  }
  /* const validPassword = await user.validatePass(password);
  if (!validPassword) {
    return res.status(401).send("Password invalid");
  }  */
  const token = jwt.sign({ id: user._id }, SECRET_TOKEN, { expiresIn: "24h" });
  return res.json({ authorization: true, token });
});

/* UserRouter.get("/profile", verifyToken, async (req, res)=> {
    const userFinded = await User.findById(req.userId, {password: 0});
    console.log(userFinded)
    if(!userFinded) {
        return res.status(404).send("user not found")
    }
    res.json(userFinded)
})  */

UserRouter.post("/reserva", async (req, res) => {
  const { fechaSalida, fechaLlegada } = req.body;

  const finded = await User.find({ email: "dariovelazquez@gmail.com" });
  console.log(finded);

  try {
    const reservaFind = await Reserva.find({
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
    });
    if (reservaFind.length) {
      res.json({
        message: "No hay reservas disponibles en este lapso de tiempo",
        fechasOcupadas: reservaFind,
      });
    } else {
      const id_reservas = await Reserva.count();
      const reserva = new Reserva({
        fechaSalida,
        fechaLlegada,
        info_user: finded,
        post_id: id_reservas + 1,
      });
      await reserva.save();
      res.json({ mesagge: "reserva exitosa!", creado: reserva });
    }
  } catch (err) {
    res.send(err);
  }
});

UserRouter.get("/prueba", async (req, res) => {
  const user_id = await Properties.updateOne(
    { _id: "60ee0706d460c340cc287fca" },
    { disponibilidad: "asd" },
    { upsert: true }
  );
  res.json({ update: user_id });
});

export default UserRouter;
