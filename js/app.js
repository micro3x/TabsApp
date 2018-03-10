var app = angular.module('tagas', ["ngRoute"]);

app.constant('youtubeConfig',{
    baseURL: "https://content.googleapis.com/youtube/v3/search",
    apiKey: "AIzaSyDCF-xVMQ-nQEYRzCgSrbPHIhT9Ti9Kavk",
    part: "snippet"
})

app.constant('gseConfig', {
    baseURL: "https://www.googleapis.com/customsearch/v1",
    customSearchId: "010346140829702378739:xeczicaklie",
    apiKey: "AIzaSyAVmfDtYNC2453AHBuCAI-kNBAC_qj3ue4",
    searchType: "image"
})

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: 'partials/home.html',
            controller: 'baseController'

    });
})
