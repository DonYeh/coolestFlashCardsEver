import { Request, Response } from "express";
import Deck from "../models/Deck";
import mongoose from "mongoose"

export async function deleteCardController(req: Request,res: Response){
    const deckId = req.params.deckId;
    const cardId = req.params.cardId;
    // const deckId = new mongoose.Types.ObjectId(req.params.deckId);
    // const cardId = new mongoose.Types.ObjectId(req.params.cardId);

    const deck = await Deck.findById(deckId);
console.log('deleteCardController, deck: ', deck)
console.log('deleteCardController, cardId to delete: ', cardId)

    if(!deck) return res.status(400).send("deck Id does not exist");
    await deck.updateOne({$pull: {"cards": {"_id": cardId}}})
    // await deck.updateOne({_id: deckId},{$pull: {'cards': {_id: cardId}}})

    // await Deck.updateOne({_id: deckId},{$pull: {'cards': {_id: cardId}}})
    // console.log('deleteCardController, Deck: ', Deck)

    await deck.save();
    

    res.json(deck);

}