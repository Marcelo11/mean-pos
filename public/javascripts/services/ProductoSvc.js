angular.module('PosApp')
.factory('ProductoSvc',function($http,$q){
	   var productoSvc = {}

        productoSvc.productos = [];

        productoSvc.producto = {};

    	var defered = $q.defer();
		var promise = defered.promise;
		
		productoSvc.getAll = function(){
			return $http.get('/productos')
			.success(function(data){
				angular.copy(data, productoSvc.productos)
				return productoSvc.productos
			})
		}
		productoSvc.get = function(){
			return $http.get('/producto/' +  producto._id, producto)
			.success(function(data){
				angular.copy(data, productoSvc.producto)
				return productoSvc.producto
			})
		}
		productoSvc.getCodigo = function(producto){
			return $http.get('/producto/' +  producto.codigo)
			.success(function(data){
				defered.resolve(data);
			}).error(function(err) {
                defered.reject(err)
            });
			return promise;
		}
		productoSvc.add= function(producto){
			return $http.post('/producto', producto)
			.success(function(producto){
				productoSvc.productos.push(producto);
			})
		}
		productoSvc.update = function(producto){
			return $http.put('/producto/' +  producto._id, producto)
			.success(function(data){
				var indice = productoSvc.productos.indexOf(producto);
				productoSvc.productos[indice] = data;
			})
		}
		productoSvc.delete = function(producto){
			return $http.delete('/producto/' +  producto._id)
			.success(function(){
				  var indice = productoSvc.productos.indexOf(producto);
            productoSvc.productos.splice(indice, 1);
			})
		}
		

        return productoSvc;
})