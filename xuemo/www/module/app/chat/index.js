angular.module('starter.controllers')

    .controller('chatCtrl', ['$scope','chatService',
        function($scope,chatService) {
            $scope.chatList=[{
                "content":"我要去打车海淀区中关村东路盈都大厦C座.......",
                "time":"22:13",
                "origin":"user",
                "avatar":'http://bbs.iapps.im/uc_server/avatar.php?uid=127194&size=middle'
            },
                {
                    "content":"正在帮您预定，费用大概45元左右",
                    "avatar":'http://a1.mzstatic.com/us/r1000/105/Purple2/v4/d7/16/87/d7168712-1fa4-619b-304d-53fd50707893/mzl.qdrjvopz.175x175-75.jpg'
                }
            ];
            $scope.chatContent='';
            $scope.addChat=function(){
                if($scope.chatContent==''){
                    return;
                }
                chatService.sendMsg(12,$scope.chatContent);
                $scope.chatList.push({
                    "content":$scope.chatContent,
                    "origin":"user"
                });
                $scope.chatContent='';
            }
        }])
