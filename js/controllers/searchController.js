app.controller('searchController', function ($scope, gseService, youtubeService, appDataService) {

    $scope.state = appDataService.state;

    $scope.doSearch = function () {
        appDataService.search();
    }
})