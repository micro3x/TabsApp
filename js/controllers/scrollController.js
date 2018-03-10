app.controller('scrollController', function ($scope, appDataService) {
    var container = angular.element(document.getElementById('content-display'));
    container.on('scroll', function () {
        var end = container[0].scrollHeight - container[0].scrollTop === container[0].clientHeight;
        if(end && appDataService.state.activeTab.searchData.result.length > 0){
            $scope.$parent.state.activeTab.dataPending = true;
            $scope.$parent.$apply();
            appDataService.nextPage();
        }
    });
});