import { Response, Request, Router, NextFunction } from "express";
import config from "../lib/config";
const router = Router();
// SDK de Mercado Pago
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: config.prod_access_token,
});
router.post("/noti", (req: Request, res: Response) => {
  const { topic, id } = req.query;
  //enviar correo???
  console.log(topic, id);
  res.status(200);
});
// ESTA EN GET PARA TESTEO, DEBERIA SER UN POST
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  // Crea un objeto de preferencia
  const { title, unit_price, quantity } = req.body;
  let preference = {
    items: [
      {
        title: title || "bicicleta",
        unit_price: unit_price || 100,
        quantity: quantity || 1,
      },
    ],
    back_urls: {
      success: "https://trekker-59f4e.web.app",
      failure: "https://trekker-59f4e.web.app",
      pending: "https://trekker-59f4e.web.app",
    },
    auto_return: "all",
    notification_url: "https://localhost:3001/mp/noti",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
        res.redirect(response.body.sandbox_init_point);
    })
    .catch((error) => next(error));
});
export default router;
