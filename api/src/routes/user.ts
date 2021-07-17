import express, { Request, Response, NextFunction, Router } from "express";
import { User, Reserva } from "../models/Users";
import { Properties } from "../models/Properties";
import { Propertiestests } from "../models/propertiestests";

//-------------------------------------------

const UserRouter = Router();
UserRouter.use(express.json());

UserRouter.post("/register", async (req: Request, res: Response) => {
  const {
    name,
    email,
    phone_number,
    nationality,
    identity_document_type,
    identity_document_number,
    date_birth,
    residence_address,
    city_and_country_of_residence,
    emergency_contact,
    emergency_phone_number,
    relationship,
    favorites,
  } = req.body;
  try {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      // const userUpdate = await User.updateOne(
      //   { email: email },
      //   {
      //     $set: {
      //       name,
      //       nationality,
      //       phone_number,
      //       identity_document_type,
      //       identity_document_number,
      //       date_birth,
      //       residence_address,
      //       city_and_country_of_residence,
      //       emergency_contact,
      //       emergency_phone_number,
      //       relationship,
      //       favorites,
      //     },
      //   }
      // );

      res.json("el email ya esta en uso");
    } else {
      const user = new User({
        name,
        email,
        phone_number,
        nationality,
        identity_document_type,
        identity_document_number,
        date_birth,
        residence_address,
        city_and_country_of_residence,
        emergency_contact,
        emergency_phone_number,
        relationship,
        favorites,
      });
      await user.save();
      return res.json(user);
    }
  } catch (err) {
    res.json(err);
  }
});

UserRouter.post("/reserva", async (req, res) => {
  const { fechaSalida, fechaLlegada, email, Prop_id } = req.body;

  const finded = await User.findOne({ email: email });
  try {
    const reservaFind = await Propertiestests.find({
      _id: Prop_id,
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
    });

    if (reservaFind.length) {
      res.json({
        message: "No hay reservas disponibles en este lapso de tiempo",
        fechasOcupadas: reservaFind,
      });
    } else {
      const reserva = new Reserva({
        fechaSalida,
        fechaLlegada,
        info_user: finded.email,
      });
      await reserva.save();

      await Propertiestests.updateOne(
        { _id: Prop_id },
        { $push: { available: reserva } }
      );

      await User.updateOne(
        { email: email },
        { $push: { reserveId: reserva._id } }
      );

      res.json({
        message: "reserva exitosa!",
        checkIn: fechaSalida,
        checkOut: fechaLlegada,
      });
    }
  } catch (err) {
    res.send(err);
  }
});

UserRouter.put("/favorites", async (req, res) => {
  try {
    const { email, favorites } = req.body;
    const user = await User.findOne({ email: email });
    const favfilter = favorites?.concat(
      user.favorites.filter((item) => favorites.indexOf(item) < 0)
    );
    const fav = await User.updateOne(
      { email: email },
      { favorites: favfilter }
    );
    console.log(email, favfilter);
    res.json(fav);
  } catch (error) {
    res.send(error);
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
