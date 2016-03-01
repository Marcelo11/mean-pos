var mongoose = require('mongoose');

var UsuariosSchema = new mongoose.Schema({
	nombre: String,
	apellido: String,
	email:String,
	telefono:String,
	usuario:String,
	password:String,
	rol: Number
});

mongoose.model('Usuarios', UsuariosSchema);