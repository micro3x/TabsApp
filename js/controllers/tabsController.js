app.controller('tabsController', function ($scope, appDataService) {
    $scope.state = appDataService.state;

    $scope.newTab = function () {
        $scope.focusTab(appDataService.newTab());
    }

    $scope.closeTab = function (tab) {
        let index = $scope.state.openTabs.indexOf(tab);
        if (index > -1) {
            $scope.state.openTabs.splice(index, 1);
            if (index === 0 && $scope.state.openTabs.length < 1) {
                $scope.newTab();
            } else {
                if (tab.id === $scope.state.activeTab.id) {
                    let newActive = index;
                    if (newActive === $scope.state.openTabs.length) {
                        newActive -= 1;
                    }
                    $scope.focusTab($scope.state.openTabs[newActive]);
                }
            }
        }
    }

    $scope.focusTab = function (tab) {
        $scope.state.activeTab = tab;
    }
})