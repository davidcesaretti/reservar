import express, { Request, Response, NextFunction, Router } from "express";
import { User, Reserva } from "../models/Users"
import jwt from "jsonwebtoken"
import verifyToken from "../controllers/verifyToken"

//-------------------------------------------

const UserRouter = Router();
UserRouter.use(express.json())
const { SECRET_TOKEN} = process.env;

UserRouter.post("/register", async (req: Request, res: Response, next)=> {
    const {username, email, password} = req.body
    const user = new User({
      username,
      email,
      password
    })
    try{

        user.password = await user.encryptPass(user.password)
        await user.save()
        const token = jwt.sign({id: user._id, },SECRET_TOKEN, { expiresIn: '24h' })
        res.json({authorization: true,token})
    }
    catch(err){
        const emailUser = await User.findOne({email: email})
        if(emailUser) {
            res.status(400).send("El email ya esta en uso")
        }
    }
  })
  

  
UserRouter.post("/login", async (req, res)=> {
    const {email,password} = req.body
   
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(404).send("The email doesn't exist")
        }
        const validPassword= await user.validatePass(password)
        if(!validPassword){
            return res.status(401).send("Password invalid")
        }
        const token = jwt.sign({id: user._id},SECRET_TOKEN, { expiresIn: '24h' })
        return res.json({authorization: true, token })
})

  
UserRouter.get("/profile", verifyToken, async (req, res)=> {
    const userFinded = await User.findById(req.userId, {password: 0});
    console.log(userFinded)
    if(!userFinded) {
        return res.status(404).send("user not found")
    }
    res.json(userFinded)
})
  
  

UserRouter.post("/reserva", async (req, res) => {
    const {fechaSalida, fechaLlegada} = req.body

    try{const reservaFind = await Reserva.find({$or: [{fechaSalida: 
        { $gte: new Date(fechaSalida), 
        $lte: new Date(fechaLlegada)}},
        {fechaLlegada: 
            { $gte: new Date(fechaSalida), 
            $lte: new Date(fechaLlegada)}}
    ]
    })
            if(reservaFind){
                res.json({
                    message: "No hay reservas disponibles en este lapso de tiempo",
                    fechasOcupadas: reservaFind
                })
            }

          else {
              const reserva  = new Reserva( {
                  fechaSalida,
                  fechaLlegada
              })
              await reserva.save()
              res.json({mesagge: "reserva exitosa!",
                  creado: reserva})
          }  }
          catch(err){
              res.send(err)
          }
})





export default UserRouter;
