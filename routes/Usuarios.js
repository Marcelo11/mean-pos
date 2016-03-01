var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Usuarios = mongoose.model('Usuarios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET
router.get('/usuarios', function(req, res, next){
	Usuarios.find(function(err, usuarios){
		if(err){return next(err)}
		
		res.json(usuarios);
	})
})

/* //GET por ID
router.get('/usuario/:id', function(req, res){
	Usuarios.findById(req.params.id, function(err, usuario){
		if(err){return (err)}
		
		res.json(usuario);
	})
}) */

//GET por usuario y password
router.get('/usuario/:user/:pass', function(req, res){
	Usuarios.find({"usuario": req.params.user, "password": req.params.pass }, function(err, usuario){
		if(err){return next(err)}
		
		res.json(usuario);
	})
})

//GET por usuario 
router.get('/usuario/:user', function(req, res){
	Usuarios.find({"usuario": req.params.user}, function(err, usuario){
		if(err){return next (err)}
		
		res.json(usuario);
	})
})

//POST
router.post('/usuario', function(req, res, next){
	var usuario = new Usuarios(req.body);
	
	usuario.save(function(err, usuario){
		if(err){return next(err)}
		res.json(usuario);
	})
})

//PUT
router.put('/usuario/:id', function(req, res){
	Usuarios.findById(req.params.id, function(err, usuario){
	
		usuario.nombre=req.body.nombre;
		usuario.apellido=req.body.apellido;
		usuario.email=req.body.email;
		usuario.telefono=req.body.telefono;
		usuario.usuario=req.body.usuario;
		usuario.password=req.body.password;
		usuario.rol=req.body.rol;
		
		usuario.save(function(err){
			if(err){res.send(err)}
		res.json(usuario);
		})
	})
})

//DELETE
router.delete('/usuario/:id', function(req, res){
	Usuarios.findByIdAndRemove(req.params.id, function(err){
		if(err){res.send(err)}
		res.json({message: 'el usuario se ha eliminado'});
	})
})

module.exports = router;