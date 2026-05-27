export const getReviews = async (req: Request, res: Response) => {
	try {
		const reviews = await Review.find().populate('book');
		res.status(200).send(reviews);
	} catch (_err) {
		res.status(500).send({ message: 'Server error' });
	}
};
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Review from '../models/review.js';

export const createReview = async (req: Request, res: Response) => {
	const { text, rating, bookId } = req.body;

	if (!mongoose.Types.ObjectId.isValid(String(bookId))) {
		return res.status(400).send({ message: 'Invalid ID' });
	}

	try {
		const review = await Review.create({ text, rating, book: String(bookId) });
		res.status(201).send(review);
	} catch (_err) {
		res.status(500).send({ message: 'Server error' });
	}
};