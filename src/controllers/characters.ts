import { Request, Response } from "express";
import axios from "axios";
import { BodyResponse, Character } from "../types/interfaces";

export const getCharacters = async (
  req: Request,
  res: Response<BodyResponse<Character[]>>
) => {
  try {
    const { sort } = req.query;
    let response = await axios.get("https://rickandmortyapi.com/api/character");
    let { data } = response;

    let sortingFunction = (a: any, b: any) => a.name.localeCompare(b.name); // Default: alphabetical

    if (sort === "planet") {
      sortingFunction = (a, b) =>
        a.location.name.localeCompare(b.location.name);
    } else if (sort === "gender") {
      sortingFunction = (a, b) => a.gender.localeCompare(b.gender);
    }

    const sortedCharacters = data.results.sort(sortingFunction);

    return res.status(200).json({
      message: `List of characters sorted by ${sort || "alphabetical"}`,
      data: sortedCharacters,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
    return res.status(500).json({
      message: "An error occurred while fetching characters",
      data: [],
      error: true,
    });
  }
};
