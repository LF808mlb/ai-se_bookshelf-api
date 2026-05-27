export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.send(book);
  } catch (err) {
    res.status(400).send({ message: 'Invalid book ID' });
  }
};
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(id, { title }, { new: true });
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.send(book);
  } catch (err) {
    res.status(400).send({ message: 'Invalid book ID' });
  }
};
export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.send(book);
  } catch (err) {
    res.status(400).send({ message: 'Invalid book ID' });
  }
};
import type { Request, Response } from 'express';
import Book from '../models/book.js';

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find({});
  res.send(books);
};
export const createBook = async (req: Request, res: Response) => {
  const { title, genre, year, tags } = req.body;
  const book = await Book.create({ title, genre, year, tags });
  res.status(201).send(book);
};