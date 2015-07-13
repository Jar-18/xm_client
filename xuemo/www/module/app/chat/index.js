angular.module('starter.controllers')

    .controller('chatCtrl', ['$scope','chatService',
        function($scope,chatService) {
            $scope.avatarMap={
                12:'http://bbs.iapps.im/uc_server/avatar.php?uid=127194&size=middle',
                18:'http://a1.mzstatic.com/us/r1000/105/Purple2/v4/d7/16/87/d7168712-1fa4-619b-304d-53fd50707893/mzl.qdrjvopz.175x175-75.jpg'
            };
            $scope.latestChat={
                "dateTime":'2015-07-13T13:19:49.490Z'
            };
            $scope.chatList=[{
                "content":"我要去打车海淀区中关村东路盈都大厦C座.......",
                "time":"22:13",
                "origin":"user",
                "userId":12,
                "dateTime":'2015-07-13T10:53:25.072Z'
            },
                {
                    "content":"正在帮您预定，费用大概45元左右",
                    "userId":18,
                    "dateTime":'2015-07-13T11:53:25.072Z'

                }
            ];
            var currentUserId=12;
            var destiny=18;
            $scope.chatContent='';
            chatService.handleMsg($scope);
            $scope.addChat=function(){
                if($scope.chatContent==''){
                    return;
                }
                chatService.sendMsg(destiny,$scope.chatContent);
                $scope.chatList.push({
                    "content":$scope.chatContent,
                    "origin":"user",
                    "userId":currentUserId
                });
                $scope.chatContent='';
            }
        }])
