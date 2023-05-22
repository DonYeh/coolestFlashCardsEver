import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createCardForDeckController(req: Request,res: Response) {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    if (!deck) return res.status(400).send("deck Id does not exist");
    // const { text } = req.body;
    console.log('req.body: ', req.body)
    const { text, definition } = req.body;
    console.log('inside createCardForDeckController', req.body)
    const newCard = {text,definition}
    console.log('newCard', newCard)
    deck.cards.push(newCard);
    console.log('deck before save', deck)
    deck.save();
    console.log('deck after save', deck)
    // const createdCard = await deck.save();
    // console.log('inside createCardForDeckController, createdCard', createdCard)
    res.json(deck);
    // res.json(createdCard);
}