import { Response, Request, Router, NextFunction } from "express";
import config from "../lib/config";
const router = Router();


router.get("/", (req: Request, res: Response, next: NextFunction) => {
  
    res.send("Operacion finalizada")
});
export default router;