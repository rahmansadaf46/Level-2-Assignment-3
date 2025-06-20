import { Router, Request, Response } from "express";
import { z } from "zod";

import { Book } from "../models/books.model";

export const booksRoutes = Router();

const CreateBookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  isbn: z.string().refine((val) => val.length === 10 || val.length === 13, {
    message: "ISBN must be exactly 10 or 13 characters long",
  }),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean().optional(),
});

booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const zodBody = await CreateBookZodSchema.parseAsync(req.body);
    const book = await Book.create(zodBody);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});

booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string | undefined;
    const filterQuery = filter ? { genre: filter } : {};
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sort as string) === "asc" ? 1 : -1;
    const sortQuery: [string, 1 | -1][] = [[sortBy, sortOrder]];
    const limit = parseInt(req.query.limit as string) || 10;
    const books = await Book.find(filterQuery).sort(sortQuery).limit(limit);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error,
    });
  }
});

booksRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error,
    });
  }
});
booksRoutes.put("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }
});
booksRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      book: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error,
    });
  }
});
