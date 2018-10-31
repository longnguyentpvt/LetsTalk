package com.letstalk.controller;

import com.letstalk.javaclass.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/dota")
    @SendTo("/room/dota")
    public ChatMessage dotaMessage(ChatMessage message) throws Exception {
        return message;
    }

    @MessageMapping("/csgo")
    @SendTo("/room/csgo")
    public ChatMessage csgoMessage(ChatMessage message) throws Exception {
        return message;
    }

}
