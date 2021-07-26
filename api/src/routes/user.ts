import express, { Request, Response, NextFunction, Router } from "express";
import { User, Reserva } from "../models/Users";
import { Properties } from "../models/Properties";
import { Propertiestests } from "../models/propertiestests";

//-------------------------------------------

const UserRouter = Router();
UserRouter.use(express.json());

UserRouter.post("/login", async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log("ruta login", req.body);
  const user = await User.findOne({ email: email });
  try {
    console.log("info del usuario", user);
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
});

UserRouter.post("/register", async (req: Request, res: Response) => {
  if (req.body.userInfo) {
    const name = req.body.userInfo?.name;
    const alternative_email = req.body.userInfo?.recuperation_email;
    const phone_number = req.body?.userInfo.phone_number;
    const identity_document_type = req.body?.userInfo.identity_document_type;
    const identity_document_number =
      req.body?.userInfo.identity_document_number;
    const nationality = req.body?.userInfo.nationality;
    const date_birth = req.body?.userInfo.date_birth;
    const residence_address = req.body?.userInfo.residence_address;
    const city_and_country_of_residence =
      req.body?.userInfo.city_and_country_of_residence;
    const emergency_phone_number = req.body?.userInfo.emergency_phone_number;
    const emergency_contact = req.body?.userInfo.emergency_contact;
    const relationship = req.body?.userInfo.relationship;

    const { userEmail } = req.body;

    console.log(req.body, " BODYYY");

    const emailUser = await User.findOne({ email: userEmail });
    if (!emailUser && userEmail) {
      console.log("ENTRO ACA");
      const user = new User({
        name: name,
        email: userEmail,
        alternative_email: alternative_email,
        phone_number: phone_number,
        identity_document_type: identity_document_type,
        identity_document_number: identity_document_number,
        nationality: nationality,
        date_birth: date_birth,
        residence_address: residence_address,
        city_and_country_of_residence: city_and_country_of_residence,
        emergency_phone_number: emergency_phone_number,
        emergency_contact: emergency_contact,
        relationship: relationship,
      });
      await user.save();
      console.log("creado", user);
      return res.json(user);
    } else if (emailUser) {
      const userupdate = await User.updateOne(
        { email: userEmail },
        {
          $set: {
            name: name,
            alternative_email: alternative_email,
            phone_number: phone_number,
            identity_document_type: identity_document_type,
            identity_document_number: identity_document_number,
            nationality: nationality,
            date_birth: date_birth,
            residence_address: residence_address,
            city_and_country_of_residence: city_and_country_of_residence,
            emergency_phone_number: emergency_phone_number,
            emergency_contact: emergency_contact,
            relationship: relationship,
          },
        }
      );
      console.log("updateada", userupdate);
      res.json(userupdate);
    } else {
      res.send("no se pudo crear usuario");
    }
  } else {
    const { name, email, photo } = req.body;

    const emailUser = await User.findOne({ email: email });
    if (!emailUser && email) {
      const user = new User({
        name,
        email,
        photo,
      });
      await user.save();
      console.log("creado", user);
      return res.json(user);
    }
  }
});

UserRouter.post("/reserva", async (req, res) => {
  const { fechaSalida, fechaLlegada, email, Prop_id, price, payment_id } =
    req.body;

  const finded = await User.findOne({ email: email });
  /*try {
    const reservaFind = await Properties.find({
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
*/
  /*  if (reservaFind.length) {
      res.json({
        message: "No hay reservas disponibles en este lapso de tiempo",
        fechasOcupadas: reservaFind,
      });
    } else { */
  const reserva = new Reserva({
    fechaSalida,
    fechaLlegada,
    info_user: finded.email,
    state: "pending",
    propertiesid: Prop_id,
    price,
    payment_id,
  });
  await reserva.save();

  await Properties.updateOne(
    { _id: Prop_id },
    { $push: { available: reserva } }
  );

  await User.updateOne({ email: email }, { $push: { reserveId: reserva._id } });

  res.json({
    message: "reserva exitosa!",
    checkIn: fechaSalida,
    checkOut: fechaLlegada,
  });
  /* }
      res.json({
        message: "reserva exitosa!",
        checkIn: fechaSalida,
        checkOut: fechaLlegada,
        guests: guests,
      });
    }
  } catch (err) {
    res.send(err);
  } */
});

/*  UserRouter.post("/favorites", async (req, res) => {
  try {
    const { email, favorites } = req.body;
    // const user = await User.findOne({ email: email });
    // const favfilter = favorites?.concat(
    //   user.favorites.filter((item) => favorites.indexOf(item) < 0)
    // )
    const favFilter = favorites.filter(
      (item, index) => favorites.indexOf(item) === index
    );
    await User.updateOne({ email: email }, { favorites: favFilter });
    res.json(favFilter);
UserRouter.put("/favorites", async (req, res) => {
  const { email, favorites } = req.body;
  const fav = await User.updateOne(
    { email: email },
    { $push: { favorites: favorites } }
  );
  res.json(fav);
});
*/
UserRouter.post("/favorites", async (req, res) => {
  try {
    const { email, favorites } = req.body;
    const user = await User.findOne({ email: email });

    await User.updateOne({ email: email }, { favorites: favorites });

    console.log(favorites, " AGREGANDO FAV BACK");
    res.json(favorites);
  } catch (error) {
    res.send(error);
  }
});

UserRouter.post("/getfavorites", async (req, res) => {
  const { email } = req.body;

  const us = await User.findOne({ email: email });
  const props = await Properties.find({ _id: us?.favorites });
  res.json(props);
});

UserRouter.post("/getreserves", async (req, res) => {
  const { email } = req.body;

  const hoy = new Date();
  const user = await User.findOne({ email: email });
  const reserva = await Reserva.find({ _id: user.reserveId });
  res.json(reserva);
});

/* UserRouter.post("/getreserves", async (req, res) => {
  const { email } = req.body;

  const hoy = new Date();
  const user = await User.findOne({ email: email });
  
let reserva = await Reserva.find({ _id: user.reserveId });
  reserva = reserva.map(x=>x._id)
  Properties.find({_id:{$all:reserva}})
  res.json(reserva);
});
 */

export default UserRouter;
