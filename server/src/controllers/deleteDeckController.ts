import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteDeckController(req: Request,res: Response){
    const deckId = req.params.deckId;
    const deckToDelete = await Deck.findByIdAndDelete(deckId);
    res.json(deckToDelete);
}