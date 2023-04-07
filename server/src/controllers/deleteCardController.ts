import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteCardController(req: Request,res: Response){
    const deckId = req.params.deckId;
    const cardId = req.params.cardId;
    const deck = await Deck.findById(deckId);
    if(!deck) return res.status(400).send("deck Id does not exist");
    deck.cards.splice(parseInt(cardId),1);
    await deck.save();
    res.json(deck);
}