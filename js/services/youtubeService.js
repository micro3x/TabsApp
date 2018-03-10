app.service('youtubeService', function ($http, gseConfig, $q, youtubeConfig) {

    function transformData(success) {
        success.data.items = success.data.items.map(function (item) {
            return {
                title: item.snippet.title,
                image: {
                    link: item.snippet.thumbnails.high.url,
                    thumbnail: item.snippet.thumbnails.medium.url
                }
            }
        })
        return success;
    }

    this.search = function (query) {
        let config = {
            method: 'GET',
            url: youtubeConfig.baseURL,
            params: {
                part: youtubeConfig.part,
                key: youtubeConfig.apiKey,
                q:query
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

    this.loadMore = function (query, nextPageToken) {
        let config = {
            method: 'GET',
            url: youtubeConfig.baseURL,
            params: {
                part: youtubeConfig.part,
                key: youtubeConfig.apiKey,
                q:query,
                pageToken: nextPageToken
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

})