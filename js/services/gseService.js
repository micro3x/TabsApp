app.service('gseService', function ($http, gseConfig, $q) {

    function transformData(success) {
        success.data.items = success.data.items.map(function (item) {
            return {
                title: item.title,
                image: {
                    link: item.link,
                    thumbnail: item.image.thumbnailLink
                }
            }
        })
        return success;
    }

    this.search = function (query) {
        let config = {
            method: 'GET',
            url: gseConfig.baseURL,
            params: {
                cx: gseConfig.customSearchId,
                key: gseConfig.apiKey,
                q: query,
                searchType: gseConfig.searchType
            }
        }
        return $http(config).then(
            function (success) {
                transformData(success);
                return success;
            },
            function (error) {
                return error
            }
        );
    }

    this.loadMore = function (query, startIndex) {
        let config = {
            method: 'GET',
            url: gseConfig.baseURL,
            params: {
                cx: gseConfig.customSearchId,
                key: gseConfig.apiKey,
                q:query,
                searchType: gseConfig.searchType,
                start:startIndex
            }
        }
        return $http(config).then(
            function (success) {
                transformData(success);
                return success;
            },
            function (error) {
                return error
            }
        );
    }
});