angular.module('PosApp')
.factory('UsuarioSvc',function($http,$q){
	   var usuarioSvc = {}

        usuarioSvc.usuarios = [];

        usuarioSvc.usuario = {};

		var defered = $q.defer();
		var promise = defered.promise;
    
		
		usuarioSvc.getAll = function(){
			return $http.get('/usuarios')
			.success(function(data){
				angular.copy(data, usuarioSvc.usuarios)
				return usuarioSvc.usuarios 
		})
		}
		
		usuarioSvc.get = function(usuario){
			return $http.get('/usuario/' +  usuario._id, usuario)
			.success(function(data){
				defered.resolve(data);
			}).error(function(err) {
                defered.reject(err)
            });
			return promise;
		}
		usuarioSvc.getUserPass = function(usuario){
			return $http.get('/usuario/' +  usuario.usuario + "/" + usuario.password, usuario)
			.success(function(data){
				defered.resolve(data);
			}).error(function(err) {
                defered.reject(err)
            });
			return promise;
		}
		usuarioSvc.getUser = function(usuario){
			return $http.get('/usuario/' +  usuario.usuario)
			.success(function(data){
				defered.resolve(data);
			}).error(function(err) {
                defered.reject(err)
            });
			return promise;
		}
		usuarioSvc.add= function(usuario){
			return $http.post('/usuario', usuario)
			.success(function(usuario){
				usuarioSvc.usuarios.push(usuario);
			})
		}
		usuarioSvc.update = function(usuario){
			return $http.put('/usuario/' +  usuario._id, usuario)
			.success(function(data){
				var indice = usuarioSvc.usuarios.indexOf(usuario);
				usuarioSvc.usuarios[indice] = data;
			})
		}
		usuarioSvc.delete = function(usuario){
			return $http.delete('/usuario/' +  usuario._id)
			.success(function(){
				   var indice = usuarioSvc.usuarios.indexOf(usuario);
            usuarioSvc.usuarios.splice(indice, 1); 
			})
		}
		

        return usuarioSvc;
})