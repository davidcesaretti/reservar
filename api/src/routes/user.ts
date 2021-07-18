import express, { Request, Response, NextFunction, Router } from "express";
import { User, Reserva } from "../models/Users";
import { Properties } from "../models/Properties";


//-------------------------------------------

const UserRouter = Router();
UserRouter.use(express.json());


UserRouter.post("/register",  async (req: Request, res: Response) => {
  const { name, recuperation_email,phone_number,nationality, identity_document_type, identity_document_number,date_birth,
    residence_address,city_and_country_of_residence, emergency_contact,emergency_phone_number,relationship,
    favorites, userEmail } = req.body;


  try{
    const emailUser = await User.findOne({ email: userEmail });
    if (emailUser) {
      console.log('hola')
      const userUpdate = await User.updateOne(
        {email: userEmail},
        {$set:{
        name,
        recuperation_email,
        nationality,
        phone_number,
        identity_document_type,
        identity_document_number,
        date_birth,
        residence_address,
        city_and_country_of_residence,
        emergency_contact,
        emergency_phone_number,
        relationship,
      }},

      )
      console.log("antesdel try", userUpdate)
      res.json(userUpdate)
    }
    else {
      const user = new User({
        name,
        userEmail,
        recuperation_email,
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
        favorites
      })
      await user.save()
      console.log("creado", user)
      return res.json(user);
    }
  }
  
  catch (err) {
    res.json(err);
  }
});




/* UserRouter.post("/reserva", async (req, res) => {
  const { fechaSalida,  fechaLlegada, email,Prop_id} = req.body;

  const finded = await User.findOne({ email:email });
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
        fechasOcupadas: reservaFind
      });
    } else {
    
      const reserva = new Reserva({
        fechaSalida,
        fechaLlegada,
        info_user: finded.email,
        
       
      });
      await reserva.save()
      
      await Propertiestests.updateOne(
        { _id: Prop_id },
        { $push: { available:reserva } })

        await User.updateOne(
          {email: email},
          {$push:{reserveId: reserva._id }}
          )
        

      res.json({message:"reserva exitosa!", checkIn:fechaSalida, checkOut: fechaLlegada});
    }
  } catch (err) {
    res.send(err);
  }
}); */


UserRouter.put("/favorites", async (req, res)=> {
  const {email , favorites} = req.body
  const fav = await User.updateOne(
    {email: email},
  { $push: { favorites: favorites } },
  )
  res.json(fav)
})

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