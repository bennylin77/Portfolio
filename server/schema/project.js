const mongoose = require("mongoose");
const projectSchema = mongoose.Schema({
  title: String,
  icon: String,
  brief: String,
  content: String,
  startedAt: Date
}, { timestamps: true });
projectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id  }
});
module.exports = mongoose.model("Project", projectSchema);
