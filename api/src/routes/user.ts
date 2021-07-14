import express, { Request, Response, NextFunction, Router } from "express";
import { User, Reserva } from "../models/Users";
import { Properties } from "../models/Properties";
import jwt from "jsonwebtoken";
import verifyToken from "../controllers/verifyToken";

//-------------------------------------------

const UserRouter = Router();
UserRouter.use(express.json());
const { SECRET_TOKEN } = process.env;


UserRouter.post("/register", async (req: Request, res: Response) => {
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




UserRouter.post("/reserva", async (req, res) => {
  const { fechaSalida,  fechaLlegada, email,Prop_id} = req.body;

  const finded = await User.findOne({ email:email });
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
        fechasOcupadas: reservaFind
      });
    } else {
    
      const reserva = new Reserva({
        fechaSalida,
        fechaLlegada,
        info_user: finded._id,
        
       
      });
      await reserva.save()
      
      await Properties.updateOne(
        { _id: Prop_id },
        { $push: { availability:reserva } })
        console.log(reserva)

        await User.updateOne(
          {email: email},
          {$push:{reserveId: reserva._id }}
          )
          // 
      res.json({message:"reserva exitosa!", checkIn:fechaSalida, checkOut: fechaLlegada});
    }
  } catch (err) {
    res.send(err);
  }
});

// UserRouter.get("/test", async (req: Request, res: Response) => {
//   Properties.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "availability[0].info_user",
//           foreignField: "_id",
//           as: "prueba",
//         },
//       },
//     ]).then((data) => res.json(data));
//   }


export default UserRouter;
