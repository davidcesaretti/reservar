import  { Schema, model, Document } from "mongoose";
// import {bcryptjs} from "bcryptjs"
const bcrypt = require ("bcryptjs")


interface IUser extends Document{
    email: string;
    password: string;
    name: string;
  }


const user = new Schema<IUser>({
    username: String,
    email: String,
    password: String
})
user.methods.encryptPass= async (pass) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
} 
user.methods.validatePass= function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports= model("User", user )