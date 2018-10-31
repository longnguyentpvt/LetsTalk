"use strict"

const chatApp = angular.module('ChatSystem', []);

chatApp.controller('ChatController', ['$scope', function ($scope) {
    // set up socket
    const userID = new Date().getMilliseconds() + "";
    let stompClient = null, subscription = null;

    function connectSocket() {
        const socket = new SockJS("/mycoding-ep");
        stompClient = webstomp.over(socket);
        stompClient.connect({}, function (frame) {
        });
    }

    connectSocket();

    // load all chat groups
    function GroupChat(groupID, groupName, groupDescription) {
        this.groupID = groupID;
        this.groupName = groupName;
        this.groupDescription = groupDescription;
    }

    const listGroups = [];
    listGroups.push(new GroupChat('dota', 'Dota 2', 'Dota 2 Community'));
    listGroups.push(new GroupChat('csgo', 'CS:GO', 'CS:GO Community'));

    // init chat box structure
    function ChatBox(groupID, groupName, groupInfo, messages) {
        this.groupID = groupID;
        this.groupName = groupName;
        this.groupInfo = groupInfo;
        this.messages = messages;

        this.addMsg = function (msg) {
            this.messages.push(msg);
        }
    }

    function ChatMessage(txt, me) {
        this.txt = txt;
        this.me = me;
    }

    // chat model
    $scope.chat = {
        groups: listGroups,
        chatBox: null,
        msg: null
    }

    // init service
    $scope.chatService = {
        msgKeyDown: null,
        receiveMsg: null,
        connectGroup: null
    }

    $scope.chatService.msgKeyDown = function ($event) {
        // check enter
        const keyCode = $event.which;
        if (keyCode === 13) {
            // if enter
            sendMsg();
            $event.preventDefault();
        }
    }

    $scope.chatService.receiveMsg = function (txt, sender) {
        if (sender != userID) {
            // add to box messages
            const newMsg = new ChatMessage(txt, false);
            $scope.chat.chatBox.addMsg(newMsg);
        }
    }

    $scope.chatService.connectGroup = function (group) {
        const groupID = group.groupID;
        const chat = $scope.chat;
        // if choose another group
        if (chat.chatBox == null || chat.chatBox.groupID != groupID) {
            if (subscription != null) {
                subscription.unsubscribe();
            }

            // init chat box
            const msgs = [];
            const chatBox = new ChatBox(groupID, group.groupName, group.groupDescription, msgs);
            chat.chatBox = chatBox;

            // then subcribe the selected group
            subscription = stompClient.subscribe('/room/' + groupID, function (messageOutput) {
                const comingMsg = angular.fromJson(messageOutput.body);
                $scope.chatService.receiveMsg(comingMsg.txt, comingMsg.sender);
                $scope.$apply();
            });
        }
    }

    function sendMsg() {
        // get model
        const chat = $scope.chat;
        const chatMsg = chat.msg;
        if (angular.isString(chatMsg) && chatMsg.length) {
            const newMsg = new ChatMessage(chatMsg, true);
            chat.chatBox.addMsg(newMsg);

            // clear the input
            chat.msg = null;

            // send
            if (stompClient != null) {
                const groupID = chat.chatBox.groupID;
                stompClient.send("/message-handler/" + groupID, angular.toJson({'txt': chatMsg, 'sender': userID}));
            }
        }
    }
}]);
