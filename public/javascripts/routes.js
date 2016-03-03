  angular.module('PosApp')
  .config(function ($routeProvider) {
    $routeProvider
	  .when('/', {
        templateUrl: 'views/login.html',
        controller: 'UsuarioCtrl'
      })
	  .when('/inicio', {
        templateUrl: 'views/inicio.html',
		 controller: 'ListarVentaCtrl'
      })
	.when('/listarUsuario', {
        templateUrl: 'views/listarUsuario.html',
        controller: 'ListarUsuarioCtrl'
      })
	.when('/agregarUsuario', {
        templateUrl: 'views/agregarUsuario.html',
        controller: 'AgregarUsuarioCtrl'
      })
	.when('/editarUsuario', {
        templateUrl: 'views/agregarUsuario.html',
        controller: 'EditarUsuarioCtrl'
      })
	.when('/listarProducto', {
        templateUrl: 'views/listarProducto.html',
        controller: 'ListarProductoCtrl'
      })
	.when('/agregarProducto', {
        templateUrl: 'views/agregarProducto.html',
        controller: 'AgregarProductoCtrl'
      })
	.when('/editarProducto', {
        templateUrl: 'views/agregarProducto.html',
        controller: 'EditarProductoCtrl'
      })
	.when('/listarVenta', {
        templateUrl: 'views/listarVenta.html',
        controller: 'ListarVentaCtrl'
      })
	.when('/agregarVenta', {
        templateUrl: 'views/agregarVenta.html',
        controller: 'AgregarVentaCtrl'
      })
	.when('/editarVenta', {
        templateUrl: 'views/agregarVenta.html',
        controller: 'EditarVentaCtrl'
      })
	.when('/totalVenta', {
        templateUrl: 'views/totalVenta.html',
        controller: 'TotalVentaCtrl'
      })
	.when('/agregarStock', {
        templateUrl: 'views/agregarStock.html',
        controller: 'AgregarStockCtrl'
      })	  
      .otherwise({
        redirectTo: '/'
      });
  });