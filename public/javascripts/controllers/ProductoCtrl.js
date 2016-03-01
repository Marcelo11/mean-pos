angular.module('PosApp')
.controller('ProductoCtrl',function($scope,$location,$cookies){

}).controller('ListarProductoCtrl',function($scope,$location,ProductoSvc,$uibModal,Pagination){
	
//funcion de paginacion; agrega los elementos a mostrar en la paginacion, en este caso 13
 $scope.pagination = Pagination.getNew(13);
//calcula la cantidad de paginas a mostrar en la paginacion
ProductoSvc.getAll().then(function(result){
	 $scope.pagination.numPages = Math.ceil(result.data.length/$scope.pagination.perPage);		
	});	
	
        $scope.productos = ProductoSvc.productos;

		
//funcion para mostrar ventana modal
$scope.showModal=function(producto){
		var modalInstance=$uibModal.open({
			templateUrl: 'views/eliminarProductoModal.html',
			controller:'EliminarProductoCtrl',
				resolve:{
					producto: function(){
						return producto;
					}
				}
			});
			};
		
 $scope.editar = function(producto) {
            ProductoSvc.producto = producto;
           $location.path("/editarProducto");
        }		
	
}).controller('AgregarProductoCtrl',function($scope,$location,ProductoSvc){
	$scope.titulo="Agregar Producto";
	 $scope.nombreBoton="Agregar";
	 $scope.agregarProducto = function() {
	ProductoSvc.getCodigo({codigo: $scope.producto.codigo}).then(function (result) {
		 if (result.data[0]==null){
            ProductoSvc.add({
                nombre: $scope.producto.nombre,
				codigo: $scope.producto.codigo,
				precio:  parseInt($scope.producto.precio),
				stock:  parseInt($scope.producto.stock)
            })
		$location.path("/listarProducto");
          
        }else{
			$scope.alertVisible=true;
		}
        })        
        };
	
	
})
.controller('EliminarProductoCtrl',function($scope,$location,ProductoSvc,producto,$uibModalInstance){
//elimina un producto	  
$scope.eliminarProducto=function(){	
 ProductoSvc.delete(producto);
		$uibModalInstance.close();
			$location.path("/listarProducto");
		
};
	  $scope.cancel=function(){
		  $uibModalInstance.dismiss('cancel');
	  };
})
.controller('EditarProductoCtrl',function($scope,$location,ProductoSvc){
	$scope.titulo="Editar Producto";
	 $scope.nombreBoton="Editar";
	 $scope.producto = ProductoSvc.producto;
	 
	  $scope.agregarProducto = function() {
           ProductoSvc.update($scope.producto);
            	$location.path("/listarProducto");
        }
	
});