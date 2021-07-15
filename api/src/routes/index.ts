import { Router } from "express";
import filters from "./get";
import mp from "./mp";
const router = Router();

router.use("/filter", filters);
router.use("/mp", mp);

export default router;
