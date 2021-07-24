import { Response, Request, Router, NextFunction } from "express";
import config from "../lib/config";
import { Reserva } from "../models/Users";
const router = Router();
// SDK de Mercado Pago
const mercadopago = require("mercadopago");

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

router.get("/pago", (req, res) => {
  /*   ?collection_id=1239047573&collection_status=approved&payment_id=1239047573&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=2995584923&preference_id=790929283-f83f5ad1-edd6-4eb7-a882-7b05a4e4d2c1&site_id=MLA&processing_mode=aggregator&merchant_account_id=null*/
  /*   const payment_id = req.query.payment_id; */
  const preference_id = req.query.preference_id;
  const payment_status = req.query.status;
  console.log("dasdsad", preference_id, payment_status);
  res.redirect("http://localhost:3000");

  /*   Reserva.findByPk(preference_id)
    .then((order) => {
      order.payment_status = payment_status;
      order
        .save()
        .then((_) => {
          return res.redirect("http://localhost:3000");
        })
    }) */
});

export default router;
