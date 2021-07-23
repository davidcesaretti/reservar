import { Response, Request, Router, NextFunction } from "express";
import config from "../lib/config";
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
      success: "http://localhost:3000",
      failure: "http://localhost:3000",
      pendind: "http://localhost:3000",
    },
    auto_return: "all",
    notification_url: "http://localhost:3000/mp/noto",
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.send(response.body);
    })
    .catch((error) => next(error));
});

export default router;
