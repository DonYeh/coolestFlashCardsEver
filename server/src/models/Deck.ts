import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
  title: String,
  // cards: [String],
  cards: [{text: String, definition: String}],
});


const DeckModel = mongoose.model('Deck', DeckSchema);

export default DeckModel;