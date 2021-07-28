import { Router } from "express";
import filters from "./get";
import image from "./postProperty";
import mp from "./mp";
import admin from "./admin"
const router = Router();

router.use("/filter", filters);
router.use("/upload", image);
router.use("/mp", mp);
router.use("/admin", admin)

export default router;
