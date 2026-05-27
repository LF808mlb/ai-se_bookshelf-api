import mongoose from 'mongoose';
  import type { Request, Response } from 'express';
  import Book from '../models/book.js';

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(String(id))) {
    return res.status(400).send({ message: 'Invalid ID' });
  }

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.send(book);
  } catch (_err) {
    res.status(400).send({ message: 'Invalid book ID' });
  }
};
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!mongoose.Types.ObjectId.isValid(String(id))) {
    return res.status(400).send({ message: 'Invalid ID' });
  }

  try {
    const book = await Book.findByIdAndUpdate(id, { title }, { new: true });
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.send(book);
  } catch (_err) {
    res.status(400).send({ message: 'Invalid book ID' });
  }
};
export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(String(id))) {
    return res.status(400).send({ message: 'Invalid ID' });
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.send(book);
  } catch (_err) {
    res.status(400).send({ message: 'Invalid book ID' });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({});
    res.status(200).send(books);
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
};
export const createBook = async (req: Request, res: Response) => {
  const { title, genre, year, tags } = req.body;
  try {
    const book = await Book.create({ title, genre, year, tags });
    res.status(201).send(book);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Validation error' });
    } else {
      res.status(500).send({ message: 'Server error' });
    }
  }
};