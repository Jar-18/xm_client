angular.module('starter.controllers')

    .controller('chatCtrl', ['$scope','chatService',
        function($scope,chatService) {
            $scope.avatarMap={
                12:'http://bbs.iapps.im/uc_server/avatar.php?uid=127194&size=middle',
                18:'http://a1.mzstatic.com/us/r1000/105/Purple2/v4/d7/16/87/d7168712-1fa4-619b-304d-53fd50707893/mzl.qdrjvopz.175x175-75.jpg'
            }
            $scope.chatList=[];
            var currentUserId=18;
            var destiny=12;
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
