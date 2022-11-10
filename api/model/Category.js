const mongoose = require("mongooose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model("Category", CategorySchema)