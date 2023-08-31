import express from "express";
import {
  getAllUsers,
  createUser,
  addFavoriteCharacter,
} from "../../controllers/user";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.patch("/:id", addFavoriteCharacter);

export default router;
