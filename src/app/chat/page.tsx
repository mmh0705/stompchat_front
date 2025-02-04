'use client';

import { useState, useEffect, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { requestPost } from "../apis/request";


export default function Chat() {   
    type messageJSON = {
        id : number,
        user : string,
        message : string,
        sessionId : string,
        userCounts : number,
        initialize : boolean,
        userCountUpdate : boolean,
        isWelcoming: boolean
    }

    type  chatUserResponse = {
        sessionId : string,
        name : string
    }

    //useRef
    const websocket = useRef<WebSocket | null>(null);
    const sessionId = useRef<string>("");
    const [userNickName, setUserNickName] = useState<string>("익명");
    const [userName, setUserName] = useState<string>("");
    
    //접속자 리스트

    //useState
    const [client] = useState<StompJs.Client | null>(null);
    const [message, setMessage] = useState("");
    //const [messageList, setMessageList] = useState<string[]>(['']);
    const [connectedClientsCount , setConnectedClientsCount] = useState(0);
    
    //채팅들
    const [chatList, setChatList] = useState<string[]>([""]);

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
        
        websocket.current.onclose = async() => {
            console.log('웹소켓 닫힘');

        }

        websocket.current.onerror = () => {
            console.log('웹소켓 에러');
        }

        websocket.current.onmessage = async (event) => {
            let json:messageJSON = JSON.parse(event.data);
            console.log(json);
            //만약 이니셜라이즈라면?
            if(json.initialize === true){
                
                //세션 아이디 갱신
                sessionId.current = json.sessionId;
                
                //유저 닉네임 저장
                let nickNameData = {
                    Id: 0,
                    userName : userName,
                    sessionId : sessionId.current,
                };

                let jsonResult = await requestPost('/api/user/create', nickNameData);
                let parsedJsonResult:chatUserResponse = JSON.parse(jsonResult);

                //프론트에 닉네임 저장 (secure로컬 스토리지로 변경할까?)
                setUserNickName(parsedJsonResult.name);     
                
                //입장 인사
                let messageData = {
                    user: userName,
                    message: userName + "님이 입장하셨습니다!",
                    isWelcoming : true,
                }
                websocket.current?.send(JSON.stringify(messageData));
            }
            //만약 웰컴 메시지라면?
            else if(json.isWelcoming){
                console.log('웰컴 메시지 갱신신?');
                //화면에 메시지 추가
                setChatList(chatList => [...chatList,json.message]);
            }
            //만약 접속자 숫자 갱신이라면?
            else if(json.userCountUpdate){
                console.log('접속자 갱신신?');
               //접속자 갱신
                setConnectedClientsCount(json.userCounts);
            }
            //일반 메시지 
            else{
                console.log('화면인가요?');
                //화면에 메시지 추가
                setChatList(chatList => [...chatList, json.user + " : " + json.message]);
            }
            
        };
    
    }

    /**
     * 메시지 보내기
     */
    const sendChat = ()=>{
      
        let messageData = {
            user: userName,
            message: message,
            isWelcoming : false,
        }
        websocket.current?.send(JSON.stringify(messageData));
        setMessage('');
    }

    /**
     * 닉네임 등록
     */
    const applyNickname = async () => {
        //일단 커넥트 
        connect();
        // let nickNameData = {
        //     UserName : userName,
        //     SessionId : '',
        // };

        // let result: string = await requestPost('/api/users', nickNameData);
        // if(typeof(result) !== undefined){
        //     console.log(JSON.parse(result));
        // }

    }

    const onCommitNickname = () => {

    }

    useEffect(() => {
        //연결
        //connect();
        setUserName("");
        return () => {
            websocket.current?.close();
        };
    },[]);

    useEffect(()=>{
        if(userNickName !== "익명"){
            console.log("done!");
        }
    },[userNickName]);

    const onSetMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    return(
        <div>
            {
                userNickName === "익명" 
                ?
                <div className="flex flex-col items-center h-dvh justify-center">
                    <div className="flex flex-col bg-teal-600 rounded-md p-10">
                        닉네임을 입력해주세요
                        <TextField label="닉네임" variant="outlined" value={userName} onChange={(event) => setUserName(event.target.value)}/>
                        <Button variant="contained" onClick={applyNickname}>확인</Button>
                    </div>
                </div>
                :
                /* 바깥 */
                <div className="flex flex-col items-center h-dvh"> 
                    {/* 위쪽 */}
                    <div className="bg-white min-w-60 h-16 text-black p-5">
                        현재 접속자 숫자 : {connectedClientsCount}    
                    </div>
                    
                    {/* 아래쪽 */}
                    <div className="flex flex-col w-full h-full bg-slate-200 items-center justify-center">
                    
                    {/**채팅유닛 */}
                        <div className="flex flex-col bg-slate-400 rounded-md h-5/6 w-5/6 p-5 ">
                            {/**채팅창 */}
                            <div className="flex-grow overflow-auto">
                                <ul>
                                {
                                    chatList.map((message, index) => {
                                        return(
                                            <li key={index}>{message}</li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                            {/* 채팅 입력 */}
                            <div className="flex flex-row rounded-md p-2">
                                <TextField label="메시지" variant="outlined" value={message} onChange={onSetMessage}/>
                                <Button className="text-black " color="primary" variant="contained" onClick={sendChat}>
                                    전송
                                </Button >
                                {/* <input value={message} onChange={onSetMessage}></input> */}
                            </div>
                        </div>
                        
                    </div>
                </div> 
            }
            
           
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
