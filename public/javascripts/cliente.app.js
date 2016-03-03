angular.module('PosApp', [
    'ngRoute','ngResource', 'ngCookies','ngAnimate', 'ui.bootstrap', 'simplePagination'
  ]).run(function($rootScope, $location, $cookies){
	  $rootScope.$on('$routeChangeStart', function(event, next, current){
		  if($cookies.get('estaConectado')==false||$cookies.get('estaConectado')==null){
				  $location.path('/');
			  
		  }else{
			  var usuario=$cookies.getObject('usuario');
			  //muestra la barra de navegación
			    $rootScope.navVisible=true;
									if(usuario[0].rol!=0){
										$rootScope.visible=false;
									}else{
										$rootScope.visible=true;
									} 
			  if(next.templateUrl!='views/login.html' && usuario[0].rol==null){
				  $location.path('/inicio');
			  }
		  }
			//esconde la barra de navegación
		   if(next.templateUrl=='views/login.html'){
			   $rootScope.navVisible=false;
		   }
		  
		  
		  
	  })
  });
