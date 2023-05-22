import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DeckSchema = new Schema({
  title: String,
  cards: [{text: String, definition: String}],
});


const Deck = mongoose.model('Deck', DeckSchema);

export default Deck;