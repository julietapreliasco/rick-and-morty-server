import { Request, Response } from "express";
import { BodyResponse } from "../types/interfaces";
import firebaseApp from "../config/firebase";
import UserModel from "../models/user";
import { User } from "../types/interfaces";

export const getAllUsers = async (
  req: Request,
  res: Response<BodyResponse<User[]>>
) => {
  const allUsers = await UserModel.find(req.query);

  return res.status(200).json({
    message: "Users obtained successfully.",
    data: allUsers,
    error: false,
  });
};

export const createUser = async (
  req: Request,
  res: Response<BodyResponse<User>>
) => {
  try {
    const isUsed = await UserModel.findOne({ email: req.body.email });
    if (isUsed) {
      res.status(404).json({
        message: `User with email ${req.body.email} is already registered.`,
        error: true,
      });
    }

    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      firebaseUid: newFirebaseUser?.uid,
    });

    const successData = await newUser.save();

    return res.status(201).json({
      message: "User created successfully.",
      data: successData,
      error: false,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "There was an error!",
      data: undefined,
      error: true,
    });
  }
};

export const addFavoriteCharacter = async (
  req: Request,
  res: Response<BodyResponse<User>>
) => {
  try {
    const userById = await UserModel.findOne({ _id: req.params.id });

    if (!userById) {
      res.status(404).json({
        message: `No user found with ID ${req.params.id}.`,
        error: true,
      });
    }

    const characterFound = userById?.favoriteCharacters?.some(
      (id) => id === req.body.favoriteCharacters
    );

    const response = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        [characterFound ? "$pull" : "$push"]: {
          favoriteCharacters: req.body.favoriteCharacters,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: `Favorite character ${
        characterFound ? "deleted" : "added"
      } successfully`,
      data: response || ({} as User),
      error: false,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      data: error,
      error: true,
    });
  }
};
