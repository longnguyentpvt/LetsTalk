<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <title>Let's Talk</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&amp;subset=vietnamese"
              rel="stylesheet">
        <link rel="stylesheet" href="/rs/css/common.css"/>
        <link rel="stylesheet" href="/rs/css/chat.css"/>

        <script src="/rs/js/angular.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
        <script src="/rs/js/webstomp.min.js"></script>
        <script src="/rs/js/chat.js"></script>
    </head>

    <body ng-app="ChatSystem">
        <div id="chat" ng-controller="ChatController">
            <div class="group-panel">
                <div class="groups">
                    <ul>
                        <li ng-repeat="aGroup in chat.groups track by aGroup.groupID">
                            <div class="aGroup" ng-click="chatService.connectGroup(aGroup)" ng-class="{'active' : aGroup.groupID === chat.chatBox.groupID}">
                                <div class="name" ng-bind="aGroup.groupName"></div>
                                <div class="desc" ng-bind="aGroup.groupDescription"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="chat-panel">
                <div class="chat-box" ng-if="chat.chatBox">
                    <div class="box-header">
                        <div class="group-info">
                            <div class="name" ng-bind="chat.chatBox.groupName"></div>
                            <div class="info" ng-bind="chat.chatBox.groupInfo"></div>
                        </div>
                    </div>
                    <div class="box-content">
                        <div class="chat-history">
                            <div class="messages">
                                <ul>
                                    <li ng-repeat="aMsg in chat.chatBox.messages">
                                        <div class="aMessage" ng-class="{'my-msg' : aMsg.me}">
                                            <div class="txt" ng-bind="aMsg.txt"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="box-message">
                        <div class="message-input">
                            <textarea placeholder="Write your message here" ng-model="chat.msg" ng-keypress="chatService.msgKeyDown($event)"></textarea>
                        </div>
                    </div>
                </div>

                <div class="no-msg" ng-if="!chat.chatBox">
                    <div class="ver-center">
                        <div class="center-ct">
                            <div class="txt">
                                Please Join To Our Community.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
