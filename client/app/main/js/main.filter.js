'use strict';

var blogApp = angular.module('blogApp');

blogApp.filter('nlToArray', function() {
    return function (text) {
        if (text) {
            return text.split('\n');
        } else {
            return '';
        }
    };
});

blogApp.filter('media', function() {
    var mediaPath = {
        image: '/assets/images/',
        video: '/assets/videos/'
    };
    var createLink = function(url, text) {
        return '<a href="' + url + '" target="_self">' + text + '</a>';
    };
    return function(paragraph, story) {
        return paragraph.replace(/{(image|video)(\d+)}/g, function(match, type, number) {
            var url = mediaPath[type] + story.media[type + 's'][parseInt(number)-1];
            return createLink(url, type);
        });
    };
});

blogApp.filter('parseUrl', function () {
    var replacements = [
        {
            //URLs starting with http://, https://, or ftp://
            search: /^(?!(href="|src="))((https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
            replace: '<a href="$2">$2</a>'
        },
        {
            //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
            search: /^(?!(href="|src="))(^|[^\/])(www\.[\S]+(\b|$))/gim,
            replace: '$1<a href="http://$2">$2</a>'
        },
        {
            //Change email addresses to mailto:: links.
            search: /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim,
            replace: '<a href="mailto:$1">$1</a>'
        }
    ];

    return function (text) {
        for (var i = 0; replacements.length > i; i++) {
            text = text.replace(replacements[i].search, replacements[i].replace);
        }

        return text;
    };
});

blogApp.filter('todayDate', function(dateFilter) {
    return function(input) {
        if (input) {
            var now = new Date();
            var date = new Date(input);

            if (now.getDate() === date.getDate() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
                return dateFilter(input, 'mediumTime');
            } else {
                return dateFilter(input, 'medium');
            }
        }
    };
});

blogApp.filter('images', function() {
    var imageUrl = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]\.(jpg|jpeg|png|gif|bmp)\/?)/gim;
    return function(input) {
        input = input.replace(imageUrl, '<a href="$1"><img src="$1"></a>');
        return input;
    };
});
