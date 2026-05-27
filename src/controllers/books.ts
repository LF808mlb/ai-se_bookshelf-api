import type { Request, Response } from 'express';
import Book from '../models/book.js';

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find({});
  res.send(books);
};