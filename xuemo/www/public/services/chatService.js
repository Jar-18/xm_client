angular.module("service.chat", [])
    .factory('chatService', ['URL_CONFIG', function(URL_CONFIG) {
        var socketHost=URL_CONFIG.host.socketHost;
        return {
            init:function(userId){
                this.socket= io.connect(socketHost);
                this.socket.emit('auth', {
                    userId: userId
                });
                this.socket.on('private_message', function(data) {
                    console.log(data);
                });
            },
            sendMsg:function(destiny,msg){
                this.socket.emit('private_message', {
                    to: destiny,
                    message: msg
                });
            }
        }
    }])