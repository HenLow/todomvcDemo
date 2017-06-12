(function (angular){
	'use strict'

	// 注册一个模块
	angular.module('app.services.main',[])
		.service('MainService',['$window',function($window){
			// $window 就是 window对象
			// 业务逻辑都必须出现在服务中（专门定义业务逻辑）数据的增删改查
			// 添加todo

			var storage = $window.localStorage;
			var todos = storage['my_todo_list'] ? JSON.parse(storage['my_todo_list']) : [];

			function getId() {
            var id = Math.random(); // 1 2
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    id = getId();
                    break;
                }
            }
            return id;
        };

        // 保存到本地存储
        this.save = function () {
        	storage['my_todo_list'] = JSON.stringify(todos);
        };
        function save(){
        	storage['my_todo_list'] = JSON.stringify(todos);
        };

        // 控制私有字段的访问权限
        this.get = function(){
        	return todos;
        };
        // 添加todo
        this.add = function(text) {
            todos.push({
                // 自动增长？
                id: getId(),
                // 由于text是双向绑定的，add同时肯定可以同他拿到界面上的输入
                text: text,
                completed: false
            });
            this.save();
        };


        // 处理删除
        this.remove = function(id) {
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    todos.splice(i, 1);
                    break;
                }
            }
            save();
        };

        // 清空已完成
        this.clearCompleted = function() {
           var result = [];
            for (var i = 0; i < todos.length; i++) {
                if (!todos[i].completed) {
                    result.push(todos[i]);
                }
            }
            todos = result;
            this.save();
            // 将todos指向一个新的地址
            return todos;
        };

        // 是否有已经完成的
        this.existCompleted = function() {
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].completed) {
                    return true;
                }
            }
            return false;
        };

        // 更新
        this.update= function(id,target) {
        	
        };

        var now = true;
        this.toggleAll = function() {
            for (var i = 0; i < todos.length; i++) {
                todos[i].completed = now;
            }
            now = !now;
            save();
        };
		}]);
})(angular);