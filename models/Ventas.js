var mongoose = require('mongoose');

var DetalleSchema = new mongoose.Schema({
	producto: {
			nombre: String,
			codigo: String,
			precio:Number,
			stock: Number
			},	
	cantidad: String,
	subtotal: Number	
	});


var VentasSchema = new mongoose.Schema({
	fecha: String,
	total: Number,
	usuario: {		
			nombre: String,
			apellido: String,
			email:String,
			telefono:String,
			usuario:String,
			password:String,
			rol: Number
			 },
	detalle: [DetalleSchema]		 
}); 

mongoose.model('Ventas', VentasSchema);

