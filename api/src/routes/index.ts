import { Router } from "express";
import filters from "./get";
import mp from "./mp";
import pago from "./pago";
const router = Router();

router.use("/filter", filters);
router.use("/mp", mp);
router.use("/pago",pago);

export default router;
