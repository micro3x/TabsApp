app.service('appDataService', ['gseService', 'youtubeService', function (gseService, youtubeService) {

    let currentTabId = 0;
    var state = {
        openTabs: [],
        activeTab: null
    };

    function TabModel(id) {
        this.searchQuery = "";
        this.searchData = {
            result: [],
            youtubeNext: {},
            gseNext: {}
        };
        this.title = "New Tab";
        this.id = id;
        this.dataPending = false;
    }

    function tabsInit() {
        if (state.openTabs.length < 1) {
            state.openTabs.push(new TabModel(currentTabId));
            currentTabId++;
            state.activeTab = state.openTabs[0];
        }
    }

    this.state = state;

    this.newTab = function () {
        let newTab = new TabModel(currentTabId);
        state.openTabs.push(newTab);
        currentTabId++;
        return newTab;
    }

    this.search = function () {
        var currentTab = state.activeTab;
        currentTab.searchData.result = [];
        currentTab.title = currentTab.searchQuery;
        currentTab.dataPending = true;
        gseService.search(currentTab.searchQuery)
            .then(
                (success) => {
                    success.data.items.forEach(item => {
                        currentTab.searchData.result.push(item);
                    });
                    currentTab.searchData.gseNext = {
                        query: success.data.queries.nextPage[0].searchTerms,
                        startIndex: success.data.queries.nextPage[0].startIndex
                    }
                    currentTab.dataPending = false;
                },
                (error) => {
                    console.log(error);
                    currentTab.dataPending = false;
                }
            );
        youtubeService.search(currentTab.searchQuery)
            .then(
                (success) => {
                    success.data.items.forEach(item => {
                        currentTab.searchData.result.push(item);
                    });
                    currentTab.searchData.youtubeNext = {
                        nextPageToken: success.data.nextPageToken
                    }
                    currentTab.dataPending = false;
                },
                (error) => {
                    console.log(error);
                    currentTab.dataPending = false;
                }
            )

    }

    this.nextPage = function () {
        var currentTab = state.activeTab;
        // currentTab.searchData.result = [];
        currentTab.title = currentTab.searchQuery;
        currentTab.dataPending = true;
        youtubeService.loadMore(currentTab.searchQuery, currentTab.searchData.youtubeNext.nextPageToken)
            .then(
                (success) => {
                    success.data.items.forEach(item => {
                        currentTab.searchData.result.push(item);
                    });
                    currentTab.searchData.youtubeNext = {
                        nextPageToken: success.data.nextPageToken
                    }
                    currentTab.dataPending = false;
                },
                (error) => {
                    console.log(error);
                    currentTab.dataPending = false;
                }
            );
        gseService.loadMore(currentTab.searchQuery, currentTab.searchData.gseNext.startIndex)
            .then(
                (success) => {
                    success.data.items.forEach(item => {
                        currentTab.searchData.result.push(item);
                    });
                    currentTab.searchData.gseNext = {
                        query: success.data.queries.nextPage[0].searchTerms,
                        startIndex: success.data.queries.nextPage[0].startIndex
                    }
                    currentTab.dataPending = false;
                },
                (error) => {
                    console.log(error);
                    currentTab.dataPending = false;
                }
            );
    }

    tabsInit();
}])