// Ionic Starter App


angular.module('starter.controllers', [])

angular.module('starter', [
        'ionic',
        'starter.controllers',

        'service.config',
        'service.chat',

        'ngCordova'
    ])

    .run(function($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            db = $cordovaSQLite.openDB("my.db");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS chat (id integer primary key, userId integer, latestMessage text, unReadCount integer, updatedAt datetime)");
        });
    })


.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('app', {
            url: "/app",
            views: {
                'app': {
                    templateUrl: 'module/app/tab/index.html'
                }
            }
        })
        .state('chat', {
            url: '/chat',
            views: {
                'app': {
                    templateUrl: 'module/app/chat/index.html',
                    controller: 'chatCtrl'
                }
            }
        })
        // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/chat');

}).controller('mainCtrl', [
    '$scope',
    '$state',
    'chatService',
    function($scope, $state, chatService) {
        var currentUserId = 12;
        var socket = chatService.init(currentUserId);
        socket.on('private_message', function(data) {
            console.debug(data);
            $scope.$root.$broadcast('privateMessage', {
                userId: currentUserId,
                msg: data
            });
        });
    }
]);