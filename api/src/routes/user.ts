import express, { Request, Response, NextFunction, Router } from "express";
import { User, Reserva } from "../models/Users";
import { Properties } from "../models/Properties";
import { Propertiestests } from "../models/propertiestests";
import axios from "axios";
import { AnyAaaaRecord } from "node:dns";

import nodemailer from "nodemailer";
import transport from "nodemailer-sendgrid-transport";
const sgMail = require("@sendgrid/mail");
/* require('dotenv').config(); */
//-------------------------------------------

/* const {SENDGRID_API_KEY_ADMIN} = process.env */

const UserRouter = Router();
UserRouter.use(express.json());

UserRouter.post("/login", async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  try {
    return res.json(user);
  } catch (error) {}
});

UserRouter.get("/userList", async (req: Request, res: Response) => {
  try {
    const users = await User.find({
      _id: { $not: { $eq: "60fcc07b78416d2aa4fd8b6e" } },
    });
    return res.json(users);
  } catch (err) {
    console.error(err);
  }
});

UserRouter.get("/userAdmin/:_id", async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id: _id });
    return res.json(user);
  } catch (err) {
    console.error(err);
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

    const emailUser = await User.findOne({ email: userEmail });
    if (!emailUser && userEmail) {
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
        admin: false,
        status_account: "Active",
        isModerator: false,
      });
      await user.save();

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
            status_account: "Active",
            isModerator: false,
          },
        }
      );

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
        admin: false,
        status_account: "Active",
        isModerator: false,
      });
      await user.save();

      return res.json(user);
    }
  }
});

UserRouter.post("/reserva", async (req, res) => {
  const {
    fechaSalida,
    fechaLlegada,
    email,
    Prop_id,
    price,
    payment_id,
    host,
    propimg,
    propname,
  } = req.body;

  const finded = await User.findOne({ email: email });
  try {
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

    if (reservaFind.length) {
      res.json({
        message: "No hay reservas disponibles en este lapso de tiempo",
        fechasOcupadas: reservaFind,
      });
    } else {
      const reserva = new Reserva({
        Prop_id,
        fechaSalida,
        fechaLlegada,
        info_user: finded.email,
        state: "pending",
        price,
        payment_id,
        host,
        propimg,
        propname,
      });
      await reserva.save();

      await User.updateOne(
        { email: email },
        { $push: { reserveId: reserva._id } }
      );
      await User.updateOne({ email: email }, { $push: { reservas: Prop_id } });

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
  const reserva = await Properties.find({ _id: user?.reservas });
  res.json(reserva);
});

UserRouter.post("/bookchat", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  const reserva = await Reserva.find({ _id: user.reserveId });
  res.json(reserva);
});
//con esta ruta ↓↓↓↓↓ traen las reservas de un usuario
UserRouter.post("/bookchat2", async (req, res) => {
  const { email } = req.body;
  const reserva = await Reserva.find({ info_user: email });
  res.json(reserva);
});

UserRouter.post("/gethostreserves", async (req, res) => {
  const { email } = req.body;

  const hoy = new Date();

  const reserva = await Reserva.find({ host: email });
  res.json(reserva);
});

UserRouter.post("/review", async (req, res) => {
  const { username, idPropertie, review, foto } = req.body;
  interface IReview {
    reviewer_name: string;
    comments: string;
    foto: string;
  }
  const Review: IReview = {
    reviewer_name: username,
    comments: review,
    foto,
  };

  const propertie = await Properties.updateOne(
    { _id: idPropertie },
    { $push: { reviews: Review } }
  );
  res.send(propertie);
});

UserRouter.get("/selectDates", async (req, res) => {
  const { Prop_id } = req.query;
  const find = await Properties.find({ _id: Prop_id });
  const obj = find[0].available.filter((x: any) => x.state === "fake");
  res.json(obj);
});

UserRouter.post("/reservafake", async (req, res, next) => {
  const { fechaSalida, fechaLlegada, email, Prop_id } = req.body;
  const finded = await User.findOne({ email: email });

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
      state: "fake",
    });
    await Properties.updateOne(
      { _id: Prop_id },
      { $push: { available: reserva } }
    );
    res.send("reserva exitosa");
  }
  next();
});

UserRouter.post("/validateadmin", async (req: Request, res: Response) => {
  const sgMail = require("@sendgrid/mail");
  const { email } = req.body;
  const code = Math.floor(Math.random() * (9999 - 1000) + 1000);

  sgMail.setApiKey(
    "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"
  );

  const msg = {
    to: email,
    from: "chesaritto_78@hotmail.com", // aqui hay que poner el correo de la pag
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>${code}</strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      return res.json(code);
    })
    .catch((err) => {
      console.log(err);
    });
});

UserRouter.post("/deleteDates", async (req, res) => {
  const { Prop_id, Prop_date } = req.body;

  const borrado: any = await Properties.find({
    _id: Prop_id,
  });
  //const filtro = borrado[0].available[0]._id;
  const reservas = borrado[0].available.map((x: any) => x);
  const filtro = reservas.filter((x) => x._id.toString() !== Prop_date);

  const properyUpdate = await Properties.updateOne(
    { _id: Prop_id },
    {
      $set: {
        available: filtro,
      },
    }
  );

  // res.json("borrado");
  res.json(properyUpdate);
});
export default UserRouter;
