import express from "express";
import { Book } from "../models/bookModel.js";
const router=express.Router();
// route for sabving a book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'send all required fields: title, author and publishyear'
            });
        }
        const newBook={
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,

        };
        const book=await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get all books for database
router.get('/',async(request,response)=>{
    try{
        const books= await Book.find({});
        return response.status(200).json({
            count: books.length,
            books: books
        });

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for Get book by id for database
router.get('/:id',async(request,response)=>{
    try{
        const {id}=request.params;
        const book= await Book.findById(id);
        return response.status(200).json(book);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for update book by id for database
router.put('/:id',async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
           return response.status(400).send({
            message:'send all required fields: title,author and publishyear',
           });
        }
          
        const {id}=request.params;
        const result =await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message: 'book not found'});
        }
        return response.status(200).send({message:'book updated succesfully'})
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route for delete a book
router.delete('/:id', async(request,response)=>{
    try{

        const {id}=request.params;
        const result=await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:'book not found'});
        }
        return response.status(200).send({message:'book deleted'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;