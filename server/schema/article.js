const mongoose = require("mongoose");
const articleSchema = mongoose.Schema({
  title: String,
  content: String
}, { timestamps: true });
articleSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id  }
});
module.exports = mongoose.model("Article", articleSchema);
