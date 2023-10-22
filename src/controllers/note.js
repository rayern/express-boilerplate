import db from "../models/index.js";
import asyncWrapper from "../middleware/async.js";
import APIError from "../errors/APIError.js";
import "dotenv/config";
import { Op } from "sequelize";

export const addNote = asyncWrapper(async (req, res) => {
	const { title, content } = req.body;
	console.log(req.user.id);
	await db.note.create({
		title: title,
		content: content,
		user_id: req.user.id,
	});
	return res.status(200).json({
		success: true,
		message: "Note added successfully",
	});
});

export const fetchNote = asyncWrapper(async (req, res) => {
	let whereClause = { user_id: req.user.id };

	if (req.query.search) {
		whereClause[Op.or] = [
			{ title: { [Op.like]: `%${req.query.search}%` } },
			{ content: { [Op.like]: `%${req.query.search}%` } },
		];
	}
	const notes = await db.note.findAll({
		where: whereClause,
	});
	const user = await db.user.findByPk(req.user.id, {
		include: [
			{
				model: db.note,
				through: { attributes: [] },
			},
		],
	});
	const sharedNotes = user.notes
	if (notes.length === 0 && sharedNotes.length === 0) {
		throw new APIError("No notes were found", 400);
	}
	return res.status(200).json({
		success: true,
		data: { notes, sharedNotes},
		message: (notes.length + sharedNotes.length) + " notes were found",
	});
});

export const updateNote = asyncWrapper(async (req, res) => {
	const { title, content } = req.body;
	const noteId = req.params.id;
	const note = await db.note.findByPk(noteId);
	if (note === null) {
		throw new APIError("Note was not found", 400);
	} else {
		note.title = title;
		note.content = content;
		note.save();
		return res.status(200).json({
			success: true,
			message: "Note updated successfully",
		});
	}
});

export const deleteNote = asyncWrapper(async (req, res) => {
	const note = await db.note.findByPk(req.params.id);
	if (note === null) {
		throw new APIError("Note was not found", 400);
	} else {
		note.destroy();
		return res.status(200).json({
			success: true,
			message: "Note deleted successfully",
		});
	}
});

export const shareNote = asyncWrapper(async (req, res) => {
	const user = await db.user.findOne({
		where: { email: req.body.email },
	});
	const note = await db.note.findByPk(req.params.id);

	if (!user || !note) {
		throw new APIError("User or note not found", 400);
	}
	await user.addNote(note, { through: { selfGranted: false } });
	return res.status(200).json({
		success: true,
		message: "Note shared successfully",
	});
});
