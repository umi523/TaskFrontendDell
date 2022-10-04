const express = require('express');
const Book = require('../models/book');
const Reservation = require('../models/reservation');
const router = express.Router();

router.post('/books/post', async (req, res) => {
    const data = new Book({
        title: req.body.title,
        description: req.body.description,
        count: req.body.count,
        countLeft: req.body.count
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json({ message: '', success: true, data: dataToSave });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false, data: null });
    }
});

router.get('/books/getAll', async (req, res) => {
    try {
        const data = await Book.find();
        res.status(200).json({ message: '', success: true, data: data });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false, data: null });
    }
});

router.get('/books/getOne/:id', async (req, res) => {
    try {
        const data = await Book.findById(req.params.id);
        res.status(200).json({ message: '', success: true, data: data });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false, data: null });
    }
});

router.patch('/books/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Book.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200).json({ message: '', success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false, data: null });
    }
});

router.delete('/books/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Book.findByIdAndDelete(id)
        res.send({ message: `Document with ${data.title} has been deleted..`, success: true, data: null })
    }
    catch (error) {
        res.status(400).json({ message: error.message, success: false, data: null })
    }
});

router.post('/reservations/post', async (req, res) => {
    const reservation = new Reservation({
        bookId: req.body.bookId,
        userName: req.body.userName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });

    try {
        const book = await Book.findById(reservation.bookId);
        if (book && book.count > 0) {
            const reservationToSave = await reservation.save();
            book.countLeft = book.count - 1;
            const options = { new: true };
            await Book.findByIdAndUpdate(
                book._id, book, options
            );
            res.status(200).json({ data: reservationToSave, success: true, message: '' });
        }
        else {
            res.status(400).json({ message: 'This book is not available!', success: false, data: null });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.delete('/reservations/clear', async (req, res) => {
    try {
        await Reservation.deleteMany({});
        var recordsToUpdate = await Book.find();
        const options = { new: true };
        recordsToUpdate.forEach(async function (doc) {
            doc.countLeft = doc.count;
            Book.updateOne({ _id: doc._id }, doc);
            await Book.findByIdAndUpdate(
                doc._id, doc, options
            )
        });
        res.status(200).json({ data: null, success: true, message: '' });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.get('/reservations/getAll', async (req, res) => {
    try {
        const data = await Reservation.find();
        res.status(200).json({ message: '', success: true, data: data });
    }
    catch (error) {
        res.status(500).json({ message: error.message, success: false, data: null });
    }
});

module.exports = router;