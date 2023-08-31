import express from "express";
import { getCharacters } from "../../controllers/characters";

const router = express.Router();

router.route("/").get(getCharacters);

export default router;
