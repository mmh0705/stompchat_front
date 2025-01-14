'use client';

// let messageData = {
//     user: "익명",
//     message: "메시지",

//     isOnOpen: false,
//     isOnClose: false,
//     userCount: 0,
// }


import { useState, useEffect, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import * as React from 'react';
import Button from '@mui/material/Button';



export default function Chat() {   
    type messageJSON = {
        id : number,
        user : string,
        message : string,
        userCounts : number
    }
    //useRef
    const websocket = useRef<WebSocket | null>(null);
    const userName = useRef<string>("익명");
    
    //useState
    const [client] = useState<StompJs.Client | null>(null);
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState<string[]>(['']);
    const [connectedClientsCount , setConnectedClientsCount] = useState(0);
    //채팅들
    const [chatList, setChatList] = useState<string[]>(["welcome"]);

    const localSocketURL = "ws://localhost:8080/user/websocket";
    const remoteSocketURL = "ws://121.162.75.86:8080/user/websocket";
    //const [websocket, setWebsocket] = useState<WebSocket>(new WebSocket("ws://localhost:8080/user/websocket"));

    /**
     * 연결
     */
    const connect = () =>{
        websocket.current = new WebSocket(localSocketURL);
        websocket.current.onopen = () => {
            console.log('웹소켓 열림');
        }
        
        websocket.current.onclose = () => {
            console.log('웹소켓 닫힘');
        }

        websocket.current.onerror = () => {
            console.log('웹소켓 에러');
        }

        websocket.current.onmessage = (event) => {
            let json:messageJSON = JSON.parse(event.data);
            
            //접속자 갱신
            setConnectedClientsCount(json.userCounts);

            //메시지 추가
            console.log(chatList);
            console.log(...chatList);
            console.log(json.message);
            let list = [...chatList, json.message];
            console.log(list);
            setChatList(chatList => [...chatList, json.message]);
            console.log(...chatList);
        };
    
    }

    /**
     * 메시지 보내기
     */
    const sendChat = ()=>{
      
        let messageData = {
            user: "익명",
            message: message,
        }
        websocket.current?.send(JSON.stringify(messageData));
    }

    /**
     * 메시지 보여주기
     */
    // const showGreeting = (message: string) => {
    //     setMessageList((prevList) => [...prevList, message]);
    // }

    useEffect(() => {
        //연결
        connect();

        return () => {
            websocket.current?.close();
        };
    },[]);

    const onSetMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    return(
        <div>
            {/* 바깥 */}
            <div className="flex flex-row items-center h-52"> 
                {/* 왼쪽 */}
                <div className="bg-white min-w-60 h-full text-black">
                    현재 접속자 숫자 : {connectedClientsCount}    
                </div>
                
                {/* 오른쪽 */}
                <div className="flex flex-col w-full h-full bg-slate-200">
                    
                    {/* 채팅 디스플레이 */}
                    {/* <div>
                        {
                            messageList.map((message, index) => (
                                <div key={index}>{message}</div>
                            ))
                        }
                    </div> */}
                    
                    {/* 채팅 입력 */}
                    <div>
                        <div>
                            <Button className="text-black" color="primary" variant="contained" onClick={sendChat}>
                                전송
                            </Button>

                            <input value={message} onChange={onSetMessage}></input>
                        </div>
                        
                        <div>
                            <ul>
                               {
                                chatList.map((message) => {
                                    return(
                                        <li key={message}>{message}</li>
                                    )
                                })
                               }
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
           
        </div>
    );
}   


//정크 존

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



          // if(client === null){
        //     return;
        // }
        // console.log("sendChat");
        // client.publish({
        //     destination: "/app/hello",
        //     body: JSON.stringify({name: name})
        // });

    /**
     * 연결 끊기
     */
    // const disconnect = () =>{
    //     if(client === null){
    //         return;
    //     } 
    //     client.deactivate();
    // }
