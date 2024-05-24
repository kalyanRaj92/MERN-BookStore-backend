const Book = require("../models/bookModel");

// Route for Create a new Book
const createBook = async (req, res) => {
  const { title, author } = req.body;
  //console.log(req.user);
  const existingBook = await Book.findOne({ title });
  if (existingBook) {
    return res.status(400).json({ message: "Book already exists" });
  }

  try {
    const bookData = await new Book({...req.body,  user: req.user});
    const savedBook = await bookData.save();
    //const populatedBook = await Book.findById(savedBook._id).populate('user', 'name email');
    res.status(201).json({ savedBook, message: "Book created successfully.." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Route for Get all Books for All Users
const getAllBooks = async (req, res) => {
  try {
    const bookData = await Book.find().populate('user', 'name email');
    if (!bookData) {
      return res.status(404).json({ message: "Book data not found" });
    }
    res.status(200).json(bookData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all books for the authenticated user
const getUserBooks = async (req, res) => {
  try {
    const books = await Book.find({user: req.user}).populate('user', 'username email');;
    //console.log(books)
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Route for Get a single Book
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const existBook = await Book.findById(id);
    if (!existBook) {
      return res.status(401).json({ message: "Book not found" });
    }
    res.status(200).json(existBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Route for update Book
const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const existBook = await Book.findById(id);
    if (!existBook) {
      return res.status(401).json({ message: "Book not found" });
    }
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ updatedBook, message: "Book updated successfully.." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Route for delete Book
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const existBook = await Book.findById(id);
    if (!existBook) {
      return res.status(401).json({ message: "Book not found" });
    }
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: "Book deleted successfully.." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getUserBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
