import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      uppercase: true,
      required: true,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "Genre must be one of the predefined values",
      },
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return v.length === 10 || v.length === 13;
        },
        message: "ISBN must be exactly 10 or 13 characters long",
      },
    },
    description: { type: String, default: "", trim: true },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Book = model<IBook>("Book", bookSchema);
