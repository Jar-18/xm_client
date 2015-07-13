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
                    $scope.$apply(function(){
                        $scope.chatList.push({
                            "content":chatInfo.msg.message
                        });
                    });
                })
            }
        }
    }])