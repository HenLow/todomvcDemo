(function(angular) {
    'use strict';

    /**
     * MyTodoMvc Module
     *
     * 应用程序的主要的模块
     */
     // 主要的模块。加载其他独立的模块
    var myApp = angular.module('app', ['ngRoute','app.controllers.main']);

    // 路由配置
    myApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/:status?',{
              controller:'MainController',
              templateUrl: 'main_tmpl'
            })
            .otherwise({ redirectTo: '/' });
    }]);

})(angular);
