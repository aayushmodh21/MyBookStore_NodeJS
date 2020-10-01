const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true, useCreateIndex: true });

var conn = mongoose.Collection;

var authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('Author', authorSchema);;
