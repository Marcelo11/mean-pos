var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Productos = mongoose.model('Productos');

/* GET home page. */
 router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); 

//GET
router.get('/productos', function(req, res, next){
	Productos.find(function(err, productos){
		if(err){return next(err)}
		
		res.json(productos);
	})
})

/* //GET por ID
router.get('/producto/:id', function(req, res){
	Productos.findById(req.params.id, function(err, producto){
		if(err){return next(err)}
		
		res.json(producto);
	})
}) */

//GET por codigo
router.get('/producto/:codigo', function(req, res){
	Productos.find({"codigo": req.params.codigo}, function(err, producto){
		if(err){return next (err)}
		
		res.json(producto);
	})
})
//POST
router.post('/producto', function(req, res, next){
	var producto = new Productos(req.body);
	
	producto.save(function(err, producto){
		if(err){return next(err)}
		res.json(producto);
	})
})

//PUT
router.put('/producto/:id', function(req, res){
	Productos.findById(req.params.id, function(err, producto){
	
		producto.nombre=req.body.nombre;
		producto.codigo=req.body.codigo;
		producto.precio=req.body.precio;
		producto.stock=req.body.stock;
		
		producto.save(function(err){
			if(err){res.send(err)}
		res.json(producto);
		})
	})
})

//DELETE
router.delete('/producto/:id', function(req, res){
	Productos.findByIdAndRemove(req.params.id, function(err){
		if(err){res.send(err)}
		res.json({message: 'el producto se ha eliminado'});
	})
})

module.exports = router;