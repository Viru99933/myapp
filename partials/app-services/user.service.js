(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.getUserById = getUserById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;

        return service;


        function getUserById(id) {
            return $http.get('/users/getUserById/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(user) {
            return $http.post('/users/login', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Create(user) {
            return $http.post('/users/register', user).then(handleSuccess, handleError('Error creating user'));
        }

        
        // private functions

        function handleSuccess(res) {
            return res;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
