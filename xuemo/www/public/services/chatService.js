angular.module("service.chat", [])
    .factory('chatService', ['URL_CONFIG', function(URL_CONFIG) {
        var socketHost=URL_CONFIG.host.socketHost;
        return {
            init:function(userId){
                this.socket= io.connect(socketHost);
                this.socket.emit('auth', {
                    userId: userId
                });
                return this.socket;
            },
            sendMsg:function(destiny,msg){
                this.socket.emit('private_message', {
                    to: destiny,
                    message: msg
                });
            },
            handleMsg:function($scope){
                $scope.$on('privateMessage',function(event,chatInfo){
                    var previousMsgTime=new Date($scope.latestChat.dateTime);
                    var currentMsgTime=new Date(chatInfo.msg.datetime);
                    var newMsg={
                        content:chatInfo.msg.message,
                        userId:chatInfo.msg.from
                    };
                    if(previousMsgTime&&(currentMsgTime-previousMsgTime)/(1000*60)>1){
                        newMsg.dateTime=currentMsgTime;
                    }
                    $scope.$apply(function(){
                        $scope.chatList.push(newMsg);
                        $scope.latestChat=newMsg;
                    });
                })
            }
        }
    }])