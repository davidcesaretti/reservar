import { Router } from "express";
import filters from "./get";
import image from "./postImage";
import mp from "./mp";
const router = Router();

router.use("/filter", filters);
router.use("/upload", image);
router.use("/mp", mp);

export default router;
