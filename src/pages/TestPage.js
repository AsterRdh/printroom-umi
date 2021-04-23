import React, { useState, useEffect } from 'react';

class TestPage extends React.Component {
  socket

  constructor(props) {
    super(props);
    let socket = new WebSocket("ws://localhost:8080/PrintRoom/myWs");
    socket.onopen = function() {
      console.log("Socket 已打开");
      //socket.send("这是来自客户端的消息" + location.href + new Date());
    };
    socket.onmessage = function(msg) {
      console.log(msg.data);
      //发现消息进入    调后台获取
    };
    //关闭事件
    socket.onclose = function() {
      console.log("Socket已关闭");
    };
  }


  checkSocket(){

    if(typeof(WebSocket) == "undefined") {
      console.log("您的浏览器不支持WebSocket");
    }else {
      console.log("您的浏览器支持WebSocket");
    }

  }

  render() {
    this.checkSocket()
    return (
      <div>
        123sdff
      </div>
    )
  }
}
export default TestPage;
