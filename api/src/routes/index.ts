import { Router } from "express";
import filters from "./get";
const router = Router();

router.use("/filter", filters);

export default router;
