var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Ventas = mongoose.model('Ventas');

/* GET home page. */
 router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); 

//GET
router.get('/ventas', function(req, res, next){
	Ventas.find(function(err, ventas){
		if(err){return next(err)}
		
		res.json(ventas);
	})
})

//POST
router.post('/venta', function(req, res, next){
	var venta = new Ventas(req.body);
	
	venta.save(function(err, venta){
		if(err){return next(err)}
		res.json(venta);
	})
})

//PUT
router.put('/venta/:id', function(req, res){
	Ventas.findById(req.params.id, function(err, venta){
	 
		venta.fecha=req.body.fecha;
		venta.total=req.body.total;
		venta.usuario=req.body.usuario;
		venta.detalle=req.body.detalle; 
		
		venta.save(function(err){
			if(err){res.send(err)}
		res.json(venta);
		})
	})
})

//DELETE
router.delete('/venta/:id', function(req, res){
	Ventas.findByIdAndRemove(req.params.id, function(err){
		if(err){res.send(err)}
		res.json({message: 'la venta se ha eliminado'});
	})
})

module.exports = router;