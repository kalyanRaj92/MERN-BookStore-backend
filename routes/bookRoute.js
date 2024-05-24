const express = require('express');
const bookRoute = express.Router();

const { createBook, 
        getAllBooks, 
        getSingleBook, 
        updateBook, 
        deleteBook,
        getUserBooks
    } = require('../controllers/bookController');

const authenticateToken = require('../middlewares/verifyToken');

bookRoute.post('/create', authenticateToken, createBook);
bookRoute.get('/allBooks', authenticateToken, getAllBooks);
bookRoute.get('/user-books', authenticateToken, getUserBooks);
bookRoute.get('/singleBook/:id', authenticateToken, getSingleBook);
bookRoute.put('/update/:id', authenticateToken, updateBook);
bookRoute.delete('/delete/:id', authenticateToken, deleteBook);

module.exports = bookRoute;
