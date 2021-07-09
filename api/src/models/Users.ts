import  { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs"



interface IUser extends Document{
    email: string;
    password: string;
    name: string;
    encryptPass(password:string): string;
    validatePass(password:string): boolean;
  }


 const user = new Schema<IUser>({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true}
})
user.methods.encryptPass= async (password)=> {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
} 
user.methods.validatePass= function (password) {
    return bcrypt.compare(password, this.password)
}

export const User = model<IUser>("User", user );

