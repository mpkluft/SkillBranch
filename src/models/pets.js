import mongoose from 'mongoose';
import _ from 'lodash';
const { Schema } = mongoose;

const PetSchema = new Schema({
  id: Number,
  userId: Number,
  type: String,
  color: String,
  age: Number,
}, {
  timestamps: true,
});

PetSchema.methods.toJSON = function () {
  return _.pick(this, ['id', 'userId', 'type', 'color', 'age']);
};

export default mongoose.model('Pet', PetSchema);