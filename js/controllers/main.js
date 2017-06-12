(function(angular) {
    'use strict'

    // 独立的模块。
    angular.module('app.controllers.main', ['app.services.main'])
        // 注册一个主要的控制器
        .controller('MainController', ['$scope', '$routeParams', '$route', 'MainService', function($scope, $routeParams, $route, MainService) {
            /*$scope.todos = [{
                id: 0.123,
                text: '学习',
                completed: false
            }, {
                id: 0.22,
                text: '睡觉',
                completed: false
            }, {
                id: 0.232,
                text: '打豆豆',
                completed: true
            }, ];*/

            // 文本框需要一个模型
            $scope.text = '';

            // 任务列表也需要一个
            // 每一个任务的结构 { id: 1, text: '学习', completed: true }
            $scope.todos = MainService.get();

            // 添加todo
            $scope.add = function() {
                if (!$scope.text) {
                    return;
                }
                MainService.add($scope.text);
                // 清空文本框
                $scope.text = '';
            };


            // 处理删除
            $scope.remove = MainService.remove;

            // 清空已完成
            $scope.clear = function() {
                var newTodos = MainService.clearCompleted();
                $scope.todos = newTodos;
            };

            // 是否有已经完成的
            $scope.existCompleted = MainService.existCompleted;

            // 当前编辑哪个元素
            $scope.currentEditingId = -1;
            $scope.editing = function(id) {
                $scope.currentEditingId = id;
            };
            $scope.save = function() {
                $scope.currentEditingId = -1;
            };

            // $scope.checkall = false;
            // $scope.$watch('checkall', function(now, old) {
            //   for (var i = 0; i < $scope.todos.length; i++) {
            //     $scope.todos[i].completed = now;
            //   }
            // });

            $scope.toggleAll = MainService.toggleAll;

            $scope.toggle = function() {
                MainService.save();
            }
            // 状态筛选
            $scope.selector = {}; // 有3种情况 {} {completed: false} {completed: true}
            var status = $routeParams.status;
            switch (status) {
                case 'active':
                    $scope.selector = { completed: false };
                    break;
                case 'completed':
                    $scope.selector = { completed: true };
                    break;
                default:
                    $route.updateParams({ status: '' })
                    $scope.selector = {};
                    break;
            };

            // 自定义一个比较函数
            $scope.equalCompare = function(source, target) {
                return source === target;
            };


        }]);
})(angular);
