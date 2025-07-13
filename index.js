const { initializeDb } = require("./db.connect")
const Book = require('./book.models')
const express = require("express")
const app = express()

app.use(express.json()) //middle Wear

initializeDb();

const newBook = {
  "title": "Lean In",
  "author": "Sheryl Sandberg",
  "publishedYear": 2012,
  "genre": ["Non-Fiction", "Business"],
  "language": "English",
  "country": "United States",
  "rating": 4.1,
  "summary": "A book about empowering women in the workplace and achieving leadership roles.",
  "coverImageUrl": "https://example.com/lean_in.jpg"
};

async function creatNewBook(newBook){
  try{
    const book = new Book(newBook)
    const bookSave = await book.save()
    // console.log("New book data", bookSave)
    return bookSave
  } catch(error){
    throw error
  }
}
// creatNewBook(newBook)
// app.post("/books", async(req, res) => {
//     try{
//     const addNewBook = await creatNewBook(newBook)
//     console.log(addNewBook)
//     if(addNewBook){
//         res.status(200).json({message: "Book added successfully.", bookSave: addNewBook})
//     } else{
//         res.status(404).json({error: "Book not found."})
//     }
//     } catch(error){
//         res.status(500).json({error: "Failed to fetch book."})
//     }
// })


const secondNewBook = 
{
  "title": "Shoe Dog",
  "author": "Phil Knight",
  "publishedYear": 2016,
  "genre": ["Autobiography", "Business"],
  "language": "English",
  "country": "United States",
  "rating": 4.5,
  "summary": "An inspiring memoir by the co-founder of Nike, detailing the journey of building a global athletic brand.",
  "coverImageUrl": "https://example.com/shoe_dog.jpg"
};

async function newSecondBook(secondNewBook){
    try{
        const newSecBook = new Book(secondNewBook)
        const saveBook = await newSecBook.save();
        // console.log("Second Book: ", saveBook)
        return saveBook
    }catch(error){
        throw error
    }
}
// newSecondBook(secondNewBook)

app.post("/books", async(req, res) => {
    try{
    const add2ndBook = await newSecondBook(secondNewBook)
    if(add2ndBook){
        res.status(200).json({message: "Book added successfully", newSecBook : add2ndBook})
    } else{
         res.status(404).json({error: "Book not found."})
    }

    } catch(error){
        res.status(500).json({error: "Failed to fetch book."})
    }
})

async function allBooks(){
    try{
       const allBooks = await Book.find()
    //    console.log("Reading all books: ",allBooks)
       return allBooks 
    } catch(error){
        throw error
    }
}
// allBooks()

app.get("/books", async(req, res) => {
    try{
    const book = await allBooks();
    if(book){
        res.json(book)
    } else{
        res.status(404).json({error: 'Book not found.'})
    }
     } catch(error){
        res.status(500).json({error: "Cannot fetch the book."})
     }
})

async function bookDetTitle(bookTitle){
    try{
        const book = await Book.findOne({title: bookTitle})
        // console.log(movie)
        return book
    } catch(error){
        throw error
    }
}
// bookDetTitle("The Great Gatsby")

app.get("/books/:title", async(req, res) => {
    try{
        const book = await bookDetTitle(req.params.title)
        console.log("book in app: ", book)
        if(book){
            res.json(book)
        } else{
            res.status(404).json({error: "Book not found"})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch the book."})
    }
})

async function bookByAuthor(author){
    try{
    const booksAuth = await Book.find({author: author})
    // console.log(booksAuth)
    return booksAuth
 } catch(error){
    throw error
 }
}
// bookByAuthor("Sheryl Sandberg")

app.get("/books/director/:author", async(req, res) => {
    try{
        const booksWithAuth = await bookByAuthor(req.params.author)
        console.log(booksWithAuth)
        if(booksWithAuth){
            res.json(booksWithAuth)
        } else{
            res.status(404).json({error: "Book cannot find."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch book."})
    }
})

async function booksByGenre(genre){
    try{
    const genreBooks = await Book.find({genre: genre})
    console.log(genreBooks)
    return genreBooks
    } catch(error){
        throw error
    }
}
// booksByGenre("Business")

app.get("/books/directory/:genre", async (req, res) => {
    try{
        const booksGenre = await booksByGenre(req.params.genre);
        console.log(booksGenre)
        if(booksGenre){
            res.json(booksGenre)
        } else{
            res.status(404).json({error: "Book not found."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch book."})
    }
})

async function bookByYear(publishedYear){
    try{
        const bookYear = await Book.find({publishedYear: publishedYear})
        // console.log(bookYear)
        return bookYear
    } catch(error){
        throw error
    }
}
// bookByYear(2012)

app.get("/books/year/:publishedYear", async (req, res) => {
    try{
    const bookYear = await bookByYear(req.params.publishedYear)
    console.log(bookYear)
    if(bookYear){
        res.json(bookYear)
    } else{
        res.status(404).json({error: "Cannot find books."})
    }
    } catch(error){
        res.status(500).json({error: "Failed to fetch books."})
    }
})

async function bookWithRating(bookId, dataToUpdate){
    try{
        const updBookRating = await Book.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        // console.log(updBookRating)
        return updBookRating

    } catch(error){     
        console.log(error)
    }
} 
// bookWithRating("686e0b34f838f52659e6114b", {rating: 4.5 })

app.post("/books/:bookId", async(req, res) => {
    try{
    const bookUpdRating = await bookWithRating(req.params.bookId, req.body)
    if(bookUpdRating){
        res.json(bookUpdRating)
    } else{
        res.status(404).json({error: "Cannot get books."})
    }
    } catch(error){
        res.status(500).json({error: "Failed to fetch books."})
    }
})

async function updRatingTitleOfBook(title, dataToUpdate){
    try{
        const updRating = await Book.findOneAndUpdate({title: title}, dataToUpdate, {new: true})
        // console.log(updRating)
        return updRating;
    } catch(error){
        throw error
    }
}
// updRatingTitleOfBook({title: "Shoe Dog"}, {publishedYear: 2016, rating: 4.1 })

app.post("/books/updateValues/:title", async (req, res) => {
    try{
        const updBook = await updRatingTitleOfBook(req.params.title, req.body)
        console.log(updBook)
        if(updBook){
            res.status(200).json({message: "Restaurant updated successfully.", updRating:updBook})
        } else{
            res.status(404).json({error: "Book does not exist."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch books."})
    }
})

async function deleBook(bookId){
    try{
    const deleBookById = await Book.findByIdAndDelete(bookId)
    // console.log("Book was deleted.",deleBookById)
    return deleBookById
    } catch(error){
        throw error
    }
}
// deleBook("6851b98cea1ff81b2609da5a")

app.delete("/books/delete/:bookId", async(req, res) => {
    try{
        const deleteBook = await deleBook(req.params.bookId)
        console.log(deleteBook)
        if(deleteBook){
            res.status(200).json({message: "Book deleted successfully."})
        } else{
            res.status(404).json({message: "Book not found."})
        }
    } catch(error){
        res.status(500).json("Failed to fetch books.")
        
    }
})


const PORT = 4000
app.listen(PORT, () => {
    console.log(`Server is running on the ${PORT}`)
})





