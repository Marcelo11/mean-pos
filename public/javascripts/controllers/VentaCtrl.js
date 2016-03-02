angular.module('PosApp')
.controller('VentaCtrl',function($scope,$location,$cookies){

}).controller('ListarVentaCtrl',function($scope,$location,$cookies,VentaSvc,$uibModal,Pagination, UsuarioSvc){
	
//funcion de paginacion; agrega los elementos a mostrar en la paginacion, en este caso 13
 $scope.pagination = Pagination.getNew(13);
//calcula la cantidad de paginas a mostrar en la paginacion
VentaSvc.getAll().then(function(result){
	 $scope.pagination.numPages = Math.ceil(result.data.length/$scope.pagination.perPage);		
	});	
	
        $scope.ventas = VentaSvc.ventas;

		
//funcion para mostrar ventana modal
 $scope.showModal=function(venta){
		var modalInstance=$uibModal.open({
			templateUrl: 'views/eliminarVentaModal.html',
			controller:'EliminarVentaCtrl',
				resolve:{
					venta: function(){
						return venta;
					}
				}
			});
			};
		
  $scope.editar = function(venta) {
            VentaSvc.venta = venta;
           $location.path("/editarVenta");
        };

$scope.totalVenta = function() {	

usuario=$cookies.getObject('usuario');
UsuarioSvc.getUser({usuario: usuario[0].usuario}).then(function (result) {
UsuarioSvc.usuario= result.data[0];
 $location.path("/totalVenta");

		 });
};	 	 	
	
}).controller('AgregarVentaCtrl',function($scope,$cookies,ProductoSvc, VentaSvc, UsuarioSvc){
$scope.nombreBoton="Realizar Venta";
$scope.detalles = [];
$scope.total=0;
cantidadProducto = 0;	
$scope.producto="";	

	
$scope.agregarDetalle=function(){

		if($scope.cantidad==null){
			cantidadProducto = 1;
		}else{
			cantidadProducto = $scope.cantidad
		}
	
	
		ProductoSvc.getCodigo({codigo: $scope.producto.codigo}).then(function (result) {
		 if (result.data[0]!=null){
        $scope.detalles.push({'producto': result.data[0], 'cantidad':cantidadProducto ,'subtotal': result.data[0].precio*cantidadProducto});  
		$scope.total=result.data[0].precio*cantidadProducto + $scope.total;
        }
        }) 
$scope.producto.codigo="";	
document.getElementById("codigo").focus();	
		
};

 //elimina un input  del detalle 
$scope.removeDetalle = function(index) {
	$scope.total= $scope.total - $scope.detalles[index].subtotal;
    $scope.detalles.splice(index,1);
  };  	
	
$scope.agregarVenta = function() {	
	if( $scope.total > 0){
		var fechaVenta = new Date().toLocaleString();
		usuario=$cookies.getObject('usuario');
		 UsuarioSvc.getUser({usuario: usuario[0].usuario}).then(function (result) {
 	VentaSvc.add({
		fecha: fechaVenta,
		total: $scope.total,
		usuario: result.data[0],
		detalle: $scope.detalles
		});	  
	
//se inicializa todo a su estado original		
$scope.detalles = [];
$scope.total=0;
cantidadProducto = 0;
$scope.producto.codigo="";
$scope.cantidad=1;
		
		 })
        .catch(function (message) {
            console.log('la promesa se ha rechazado' + message);
         
        });
		
		
	}
document.getElementById("codigo").focus();		
};


	
}).controller('EliminarVentaCtrl',function($scope,$location,VentaSvc,venta,$uibModalInstance){
//elimina una venta	  
$scope.eliminarVenta=function(){	
 VentaSvc.delete(venta);
		$uibModalInstance.close();
			$location.path("/listarVenta");
		
};
	  $scope.cancel=function(){
		  $uibModalInstance.dismiss('cancel');
	  };
}).controller('EditarVentaCtrl',function($scope,$location, VentaSvc, ProductoSvc){
$scope.nombreBoton="Editar Venta";
$scope.venta= VentaSvc.venta;
$scope.detalles = $scope.venta.detalle;
$scope.total=$scope.venta.total;
	
	
	
$scope.agregarDetalle=function(){
		if($scope.cantidad==null){
			cantidadProducto = 1;
		}else{
			cantidadProducto = $scope.cantidad
		}
	
	
		ProductoSvc.getCodigo({codigo: $scope.producto.codigo}).then(function (result) {
		 if (result.data[0]!=null){
        $scope.detalles.push({'producto': result.data[0], 'cantidad':cantidadProducto ,'subtotal': result.data[0].precio*cantidadProducto});  
		$scope.total=result.data[0].precio*cantidadProducto + $scope.total;
        }
        }) 
$scope.producto.codigo="";	
document.getElementById("codigo").focus();			
};	
 //elimina un input  del detalle 
$scope.removeDetalle = function(index) {
$scope.total= $scope.total - $scope.detalles[index].subtotal;
$scope.detalles.splice(index,1);
  }; 	
	 
	  $scope.agregarVenta = function() {
		  
		  if( $scope.total > 0){
$scope.venta.detalle = $scope.detalles;
$scope.venta.total= $scope.total;

		
			VentaSvc.update($scope.venta);
            	$location.path("/listarVenta");  
			  
			  
		  }
		  
document.getElementById("codigo").focus();	           
        }; 
	
}).controller('TotalVentaCtrl',function($scope, VentaSvc, UsuarioSvc){
	VentaSvc.getAll().then(function(result){
	 	 VentaSvc.ventas = result.data;
		
	$scope.usuario=UsuarioSvc.usuario;
	var fechaHoy = new Date().toLocaleString();
	var hoy= ((fechaHoy.toString()).split(" ",1))[0];
	var mes= ((((fechaHoy.toString()).split(" ",1))[0]).split("/"))[1] + ((((fechaHoy.toString()).split(" ",1))[0]).split("/"))[2];
	var ano= ((((fechaHoy.toString()).split(" ",1))[0]).split("/"))[2];
i = 0;
$scope.totalDia=0;
$scope.totalMes=0;
$scope.totalAno=0;
$scope.totalesDia=0;
$scope.totalesMes=0;
$scope.totalesAno=0;

while (VentaSvc.ventas[i]) {

fechaVentaHoy=((VentaSvc.ventas[i].fecha).split(" ",1))[0];
 	if(VentaSvc.ventas[i].usuario.usuario == $scope.usuario.usuario&& fechaVentaHoy == hoy){
	$scope.totalDia=VentaSvc.ventas[i].total + $scope.totalDia;
																	}
fechaVentaMes=((fechaVentaHoy).split("/"))[1]+((fechaVentaHoy).split("/"))[2];																
	if(VentaSvc.ventas[i].usuario.usuario == $scope.usuario.usuario&& fechaVentaMes == mes){
	$scope.totalMes=VentaSvc.ventas[i].total + $scope.totalMes;	
																	}
fechaVentaAno=((fechaVentaHoy).split("/"))[2];																	
	if(VentaSvc.ventas[i].usuario.usuario == $scope.usuario.usuario&& fechaVentaAno == ano){
	$scope.totalAno=VentaSvc.ventas[i].total + $scope.totalAno;	
																	}
	if(fechaVentaHoy == hoy){
	$scope.totalesDia=VentaSvc.ventas[i].total + $scope.totalesDia;
																	}
															
	if(fechaVentaMes == mes){
	$scope.totalesMes=VentaSvc.ventas[i].total + $scope.totalesMes;	
																	}
															
	if(fechaVentaAno == ano){
	$scope.totalesAno=VentaSvc.ventas[i].total + $scope.totalesAno;	
																	}																
	
    i++;
	
}
	});
   $scope.today = function() {
    $scope.dt1 = new Date();
	$scope.dt2 = new Date();
	$scope.dt3 = new Date();
	$scope.dt4 = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt1 = null;
	$scope.dt2 = null;
	$scope.dt3 = null;
	$scope.dt4 = null;
  };

  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

   $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
  
  $scope.open3 = function() {
   $scope.popup3.opened = true;
  };
  
  $scope.open4 = function() {
  $scope.popup4.opened = true;
  };

 

 
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd/MM/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };
  
   $scope.popup3 = {
    opened: false
  };

  $scope.popup4 = {
    opened: false
  };

 $scope.dateOptions = {'clear-text': 'Hoy'};  
  
    $scope.calcularVentaFechaUsuario= function(){
	 
	  
	  var fechaInicio = (($scope.dt3.toLocaleString()).split(" ",1))[0];
	  var fechaFin = (($scope.dt4.toLocaleString()).split(" ",1))[0];
	  $scope.totalFecha=0;
	  i = 0;
	 	
while (VentaSvc.ventas[i]) {

fechaVenta=((VentaSvc.ventas[i].fecha).split(" ",1))[0];


	 if(VentaSvc.ventas[i].usuario.usuario == $scope.usuario.usuario&&moment(fechaVenta, "DD-MM-YYYY") >= moment(fechaInicio, "DD-MM-YYYY") && moment(fechaVenta, "DD-MM-YYYY") <= moment(fechaFin, "DD-MM-YYYY")){
	$scope.totalFecha=VentaSvc.ventas[i].total + $scope.totalFecha;
																	}	 

    i++;
	 
}
		
  };
  
  
  $scope.calcularVentaFecha= function(){
	 
	  
	  var fechaInicio = (($scope.dt1.toLocaleString()).split(" ",1))[0];
	  var fechaFin = (($scope.dt2.toLocaleString()).split(" ",1))[0];
	  $scope.totalesFecha=0;
	  i = 0;
	 
	 
	 
		
		
while (VentaSvc.ventas[i]) {

fechaVenta=((VentaSvc.ventas[i].fecha).split(" ",1))[0];



 	if(moment(fechaVenta, "DD-MM-YYYY-MM-DD") >= moment(fechaInicio, "DD-MM-YYYY") && moment(fechaVenta, "DD-MM-YYYY") <= moment(fechaFin, "DD-MM-YYYY")){
	$scope.totalesFecha=VentaSvc.ventas[i].total + $scope.totalesFecha;
																	}																
	
    i++;
	 
}
		  

  };
	

});	