import { Response, Request, Router, NextFunction} from "express";
const router = Router();
// SDK de Mercado Pago
const mercadopago = require("mercadopago");


mercadopago.configure({
  access_token: "TEST-6623451607855904-111502-83c610c2165674e9bba665cfb4aa6b0c-672708410"
});

// ESTA EN GET PARA TESTEO, DEBERIA SER UN POST

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  // Crea un objeto de preferencia
  const { title, unit_price, quantity } = req.body;

  let preference = {
    items: [
      {
        title: title || "bicicleta",
        unit_price: unit_price || 1200,
        quantity: quantity || 5,
      },
    ],
  };   

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
     // var invocation = new XMLHttpRequest();
      let url = response.body.init_point;
      console.log(url)
      res.send(url);

 
    })
    .catch(function(error){console.log(error)});
});


export default router;
