const mongoose = require("mongoose");
const mediaSchema = mongoose.Schema({
  destination: String,
  filename: String,
  size: Number,
  mimetype: String,
}, { timestamps: true });
mediaSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id  }
});
module.exports = mongoose.model("Media", mediaSchema);
