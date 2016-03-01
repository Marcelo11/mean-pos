angular.module('PosApp')
.controller('UsuarioCtrl',function($scope,$location,$cookies,UsuarioSvc){
//reinicia las cookies de sesion si entra a la página del login	
	$cookies.remove('usuario'); 
	$cookies.remove('estaConectado'); 
		
//inicia sesion
$scope.iniciarSesion=function(){
UsuarioSvc.getUserPass({usuario: $scope.usuario.usuario, password: $scope.usuario.password}).then(function (result) {
           console.log(result.data[0]);
		   	if (result.data[0]==null){
//si usuario no existe lo reenvia al login				
			$scope.alertVisible=true;
			$location.path("/");
		}else{
//si usuario existe, crea las cookies de sesión	
	$cookies.put('estaConectado',true);		
	$cookies.putObject('usuario',result.data);
	$location.path("/inicio");
		}
        })
        .catch(function (message) {
            console.log('la promesa se ha rechazado' + message);
         
        });

};

}).controller('ListarUsuarioCtrl',function($scope,$location,$cookies,UsuarioSvc,$uibModal, Pagination){

//funcion de paginacion; agrega los elementos a mostrar en la paginacion, en este caso 13
 $scope.pagination = Pagination.getNew(13);
//calcula la cantidad de paginas a mostrar en la paginacion
UsuarioSvc.getAll().then(function(result){
	 $scope.pagination.numPages = Math.ceil(result.data.length/$scope.pagination.perPage);		
	});	
		
        $scope.usuarios = UsuarioSvc.usuarios;
		$scope.roles = ['Administrador', 'Encargado', 'Cajero'];
		
	

//funcion para mostrar ventana modal
$scope.showModal=function(usuario){
		var modalInstance=$uibModal.open({
			templateUrl: 'views/eliminarUsuarioModal.html',
			controller:'EliminarUsuarioCtrl',
				resolve:{
					usuario: function(){
						return usuario;
					}
				}
			});
			};
		
$scope.editar = function(usuario) {
UsuarioSvc.usuario = usuario;
$location.path("/editarUsuario");
        };
		
$scope.totalVenta = function(usuario) {	
UsuarioSvc.usuario= usuario;
$location.path("/totalVenta");

};		
	
}).controller('AgregarUsuarioCtrl',function($scope,$location,UsuarioSvc){
$scope.titulo="Agregar Usuario";
$scope.nombreBoton="Agregar";
$scope.agregarUsuario = function() {
		 UsuarioSvc.getUser({usuario: $scope.usuario.usuario}).then(function (result) {
		   	if (result.data[0]==null){
			
			   UsuarioSvc.add({
                nombre: $scope.usuario.nombre,
				apellido: $scope.usuario.apellido,
				email: $scope.usuario.email,
				telefono: $scope.usuario.telefono,
				usuario: $scope.usuario.usuario,
				password: $scope.usuario.password,
                rol: parseInt($scope.usuario.rol)
            })
			$location.path("/listarUsuario");
			
			
			
		}else{
		$scope.alertVisible=true;
		}
        })        
        };
		
	
})
.controller('EliminarUsuarioCtrl',function($scope,$location,$cookies,UsuarioSvc,usuario,$uibModalInstance){
//elimina un usuario	  
$scope.eliminarUsuario=function(){	
 UsuarioSvc.delete(usuario);
	 
		$uibModalInstance.close();
		$location.path("/listarUsuario");	
		
};
	  $scope.cancel=function(){
		  $uibModalInstance.dismiss('cancel');
	  };
})
.controller('EditarUsuarioCtrl',function($scope,$location,$cookies,UsuarioSvc){
	 $scope.titulo="Editar Usuario";
	 $scope.nombreBoton="Editar";
	 $scope.usuario = UsuarioSvc.usuario;
	 
	  $scope.agregarUsuario = function() {
           UsuarioSvc.update($scope.usuario);
            	$location.path("/listarUsuario");
        }
	
});