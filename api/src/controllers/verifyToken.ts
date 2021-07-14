import jwt from "jsonwebtoken"


const { SECRET_TOKEN} = process.env;


 function verifyToken (req, res, next){
    const token = req.headers["x-access-token"]
  if(!token){
    return res.status(401).json({authorization: false, message: "No token provided, access denied"})
  }
  const decoded = jwt.verify(token,SECRET_TOKEN )
  req.userId = decoded.id
  next()
}

export default verifyToken