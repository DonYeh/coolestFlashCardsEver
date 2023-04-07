import express, {Request, Response} from "express";
import mongoose from "mongoose";
import Deck from './models/Deck';

const PORT = 5000;

const app = express();

app.use(express.json());

app.get('/', (req: Request,res: Response)=> {
    res.send("hellooo");
});

app.post('/decks', async (req: Request,res: Response)=> {
    console.log(req.body);
    // res.send("hello world");
    const newDeck = new Deck({
        title: req.body.title,
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});

mongoose
    .connect('mongodb+srv://flashcarduser:EnPFv16BkEUQLwfk@cluster0.wmsnvdp.mongodb.net/?retryWrites=true&w=majority').then(()=> {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
})

