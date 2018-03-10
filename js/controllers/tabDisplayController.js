app.controller('tabDisplayController', function ($scope, appDataService, $window) {
    $scope.state = appDataService.state;
    $scope.displayItem = {
        show: false,
        item: {}
    }

    $scope.openItem = function (item) {
        $scope.displayItem.item = item;
        $scope.displayItem.show = true;
    }

    $scope.closeItem = function () {
        $scope.displayItem.show = false;
    }
})