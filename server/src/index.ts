import { config } from 'dotenv';
config();

import express, {Request, Response, urlencoded} from "express";
import mongoose from "mongoose";
import cors from "cors";

import Deck from './models/Deck';
import { getDecksController } from './controllers/getDecksController';
import { createDeckController } from './controllers/createDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { createCardForDeckController } from './controllers/createCardForDeckController';
import { getDeckController } from './controllers/getDeckController';
import { deleteCardController } from './controllers/deleteCardController';

const PORT = 5000;

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req: Request,res: Response)=> {
    res.send("hellooo");
});

app.get('/decks', getDecksController);

app.post('/decks', createDeckController);

app.delete('/decks/:deckId', deleteDeckController);

app.post('/decks/:deckId/cards', createCardForDeckController)

app.get('/decks/:deckId', getDeckController);

app.delete('/decks/:deckId/cards/:cardId', deleteCardController);

mongoose
    .connect(process.env.MONGO_URL!).then(()=> {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
})

