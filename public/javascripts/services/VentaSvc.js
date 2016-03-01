angular.module('PosApp')
.factory('VentaSvc',function($http,$q){
	   var ventaSvc = {}

        ventaSvc.ventas = [];

        ventaSvc.venta = {};

    	var defered = $q.defer();
		var promise = defered.promise;
		
		ventaSvc.getAll = function(){
			return $http.get('/ventas')
			.success(function(data){
				angular.copy(data, ventaSvc.ventas)
				return ventaSvc.ventas
			})
		}
		ventaSvc.get = function(){
			return $http.get('/venta/' +  venta._id, venta)
			.success(function(data){
				angular.copy(data, ventaSvc.venta)
				return ventaSvc.venta
			})
		}
	/* 	ventaSvc.getCodigo = function(venta){
			return $http.get('/venta/' +  venta.codigo)
			.success(function(data){
				defered.resolve(data);
			}).error(function(err) {
                defered.reject(err)
            });
			return promise;
		} */
		ventaSvc.add= function(venta){
			return $http.post('/venta', venta)
			.success(function(venta){
				ventaSvc.ventas.push(venta);
			})
		}
		ventaSvc.update = function(venta){
			return $http.put('/venta/' +  venta._id, venta)
			.success(function(data){
				var indice = ventaSvc.ventas.indexOf(venta);
				ventaSvc.ventas[indice] = data;
			})
		}
		ventaSvc.delete = function(venta){
			return $http.delete('/venta/' +  venta._id)
			.success(function(){
				  var indice = ventaSvc.ventas.indexOf(venta);
            ventaSvc.ventas.splice(indice, 1);
			})
		}
		

        return ventaSvc;
})