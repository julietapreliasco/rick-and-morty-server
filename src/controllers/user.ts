import { Request, Response } from "express";
import { BodyResponse } from "../types/interfaces";
import { CustomError } from "../models/cutom-error";
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
      throw new CustomError(
        400,
        `User with email ${req.body.email} is already registered.`
      );
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
    throw new CustomError(500, error.message);
  }
};