(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['UserService', '$rootScope'];

    function ProfileController(UserService, $rootScope) {
        var vm = this;
        vm.user = null;
        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.getUserById($rootScope.globals.currentUser.user._id)
                .then(function(response) {
                    if (response.data.status == 200) {
                        vm.user = response.data.data;
                    }
                });
        }
    }

})();