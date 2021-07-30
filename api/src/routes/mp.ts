import { Response, Request, Router, NextFunction } from "express";
import config from "../lib/config";
import { Properties } from "../models/Properties";
import { Reserva, User } from "../models/Users";
const router = Router();
// SDK de Mercado Pago
const mercadopago = require("mercadopago");

export interface nito {
  user_info: string;
}
mercadopago.configure({
  access_token: config.prod_access_token,
});
// ESTA EN GET PARA TESTEO, DEBERIA SER UN POST
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  // Crea un objeto de preferencia
  const { title, unit_price, quantity } = req.body;
  let preference = {
    items: [
      {
        title,
        unit_price,
        quantity: 1,
      },
    ],
    back_urls: {
      success: "http://localhost:3001/mp/pago", // /mp/pago
      failure: "http://localhost:3001/mp/pago",
      pendind: "http://localhost:3001/mp/pago",
    },
    auto_return: "all",
    /*     notification_url: "https://app-trekker.herokuapp.com/noti",
     */
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.send(response.body);
    })
    .catch((error) => next(error));
});

router.get("/pago", async (req, res, next) => {
  /*   ?collection_id=1239047573&collection_status=approved&payment_id=1239047573&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=2995584923&preference_id=790929283-f83f5ad1-edd6-4eb7-a882-7b05a4e4d2c1&site_id=MLA&processing_mode=aggregator&merchant_account_id=null*/
  /*   const payment_id = req.query.payment_id; */
  const preference_id = req.query.preference_id;
  const payment_status = req.query.status;

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const properyUpdate = await Reserva.updateOne(
    { payment_id: preference_id },
    {
      $set: {
        state: payment_status,
      },
    }
  );

  if (payment_status === "approved") {
    const aux2 = [];
    Reserva.find({ payment_id: preference_id }).then(async (res) => {
      aux2.push(res);
      await Properties.updateOne(
        { _id: aux2[0].Prop_id },
        { $push: { available: aux2[0] } }
      );

      await User.updateOne(
        { email: aux2[0].info_user },
        { $push: { reserveId: aux[0]._id } }
      );
      await User.updateOne(
        { email: aux2[0].info_user },
        { $push: { reservas: aux2[0].Prop_id } }
      );
    });
    var aux = [];
    Reserva.find({ payment_id: preference_id }).then((res) => {
      aux.push(res[0]);
      const msg = {
        to: aux[0].info_user,
        from: "trekkerhenry@gmail.com", // aqui hay que poner el correo de la pag
        subject: "Trekker Rent",
        text: "Gracias por confiar en trekker!",
        html: "<h2>Gracias por confiar en trekker!</h2>",
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  res.redirect("http://localhost:3000");
});

export default router;
