var mongoose = require('mongoose');

var ProductosSchema = new mongoose.Schema({
	nombre: String,
	codigo: String,
	precio:Number,
	stock: Number
});

mongoose.model('Productos', ProductosSchema);