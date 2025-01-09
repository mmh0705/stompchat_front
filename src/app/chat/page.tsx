'use client';

import { useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";

export default function Chat() {   
    const [client, setClient] = useState<StompJs.Client | null>(null);
    const [name, setName] = useState("");
    const [messageList, setMessageList] = useState<string[]>(['']);
    const [websocket, setWebsocket] = useState<WebSocket>(new WebSocket("ws://localhost:8080/user/websocket"));
    /**
     * 연결
     */
    const connect = () =>{
        // STOMP example
        // //소켓 연결
        // try{
        //     const stompClient = new StompJs.Client({
        //         //brokerURL: "ws://121.162.75.86:8080/gs-guide-websocket",
        //         brokerURL: "ws://localhost:8080/gs-guide-websocket",
        //         reconnectDelay: 5000, // 자동 재 연결
        //         heartbeatIncoming: 4000,
        //         heartbeatOutgoing: 4000,
        //     });
            
        //     setClient(stompClient);
            
        //     stompClient.onConnect = (frame) =>{
        //         console.log('Connected: ' + frame);
        //         stompClient.subscribe('/topic/greetings', (greeting) =>{
        //             showGreeting(JSON.parse(greeting.body).content);
        //         });
        //     }

        //     stompClient.activate();

        // }
        // catch(err){
        //     console.error(err);
        // }
        
        // Vanilla WebSocket
        // let temp = new WebSocket("ws://localhost:8080/user/websocket");
        // setWebsocket(temp);
        websocket.onmessage = onMessage;	// 소켓이 메세지를 받을 때
        websocket.onopen = onOpen;		// 소켓이 생성될때(클라이언트 접속)
        websocket.onclose = onClose;	// 소켓이 닫힐때(클라이언트 접속해제)  
    }

    /**
     * 연결 끊기
     */
    const disconnect = () =>{
        if(client === null){
            return;
        } 
        client.deactivate();
    }

    /**
     * 메시지 보내기
     */
    const sendChat = ()=>{
        // if(client === null){
        //     return;
        // }
        // console.log("sendChat");
        // client.publish({
        //     destination: "/app/hello",
        //     body: JSON.stringify({name: name})
        // });
        websocket.send(name);
    }

    /**
     * 메시지 보여주기
     */
    const showGreeting = (message: string) => {
        setMessageList((prevList) => [...prevList, message]);
    }

    useEffect(() => {
        //연결
        connect();

        return () => {
            disconnect();
        }
    },[]);







    const onSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }


    // 바닐라 웹소켓 전용
    
    const onClose = (evt :any) => {
        console.log("close event : " + evt);
    }

    const onOpen = (evt :any) => {
        console.log("open event : " + evt);
    }
    const onMessage = (msg: any) => {
        let data =msg.data; // msg를 받으면 data 필드 안에 Json String으로 정보가 있음
        // 필요한 정보를 Json data에서 추출

        console.log(data);
        let senderId = data.senderId;
        let message = data.message;
        let time = data.time;
        let newOne = data.newOne;
        let outOne = data.outOne;
    }
    return(
        <div>
            {/* 바깥 */}
            <div className="flex flex-row items-center h-52"> 
                {/* 왼쪽 */}
                <div className="bg-white min-w-60 h-full">
                    접속자 목록    
                </div>
                
                {/* 오른쪽 */}
                <div className="bg-slate-200 w-full h-full">
                    {
                        messageList.map((message, index) => (
                            <div key={index}>{message}</div>
                        ))
                    }
                    <div>
                        <button className="bg-slate-500" onClick={sendChat}>전송</button>
                    </div>
                    <div>
                        <input type="text" value={name} onChange={onSetName}>
                        
                        </input>
                    </div>
                </div>
            </div>
           
        </div>
    );
}   