import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createCardForDeckController(req: Request,res: Response) {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    if (!deck) return res.status(400).send("deck Id does not exist");
    // const { text } = req.body;
    const { text, definition } = req.body;
    console.log('inside createCardForDeckController', req.body)
    const newCard = {text,definition}
    console.log('newCard', newCard)
    deck.cards.push(newCard);
    console.log('deck', deck)
    await deck.save();
    res.json(deck);
}