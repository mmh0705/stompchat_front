'use client';

import { useState, useEffect, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { requestGet, requestPost } from "../apis/request";


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
        session_id : string,
        name : string
    }

    //useRef
    const websocket = useRef<WebSocket | null>(null);
    const sessionId = useRef<string>("");
    
    
    //접속자 리스트

    //useState
    const [userFiexdNickName, setUserFiexdNickName] = useState<string>("익명");
    const [inputUserName, setInputUserName] = useState<string>("");
    const [message, setMessage] = useState("");
    const [connectedClientsCount , setConnectedClientsCount] = useState(0);
    
    //채팅들
    const [chatList, setChatList] = useState<string[]>([""]);

    const localSocketURL = "ws://localhost:8080/user/websocket";
    const remoteSocketURL = "ws://121.162.75.86:8080/user/websocket";



    const handleKeyDownEvent = (e:React.KeyboardEvent) => {
        if(e.key === 'Enter'){
            sendChat();
        }
    }

    /**
     * 연결
     */
    const connect = () =>{
        websocket.current = new WebSocket(remoteSocketURL);
        websocket.current.onopen = () => {
            console.log('웹소켓 열림');
        }
        
        websocket.current.onclose = async() => {
            console.log('웹소켓 닫힘');
            //웹소켓이 닫혔음을 채팅창에 공지하고 새로고침을 유도한다.
            setChatList(chatList => [...chatList, "웹소켓이 닫혔습니다. 새로고침을 해주세요!"])
        }

        websocket.current.onerror = () => {
            console.log('웹소켓 에러');
        }

        websocket.current.onmessage = async (event) => {
            let json:messageJSON = JSON.parse(event.data);
            
            //만약 신규 등록(initialize)라면?
            if(json.initialize === true){
                
                //1. 세션 아이디 갱신
                sessionId.current = json.sessionId;
                
                let sendData = {
                    name: inputUserName,
                    session_id: json.sessionId
                }
                //2. 세션 아이디와 닉네임 DB 저장
                let result:chatUserResponse = await requestPost('/api/user/create', sendData);
                console.log(result);
                
                //3. 웰컴 메시지 전송송
                let messageData = {
                    user: inputUserName,
                    message: inputUserName + "님이 입장하셨습니다!",
                    isWelcoming : true,
                }
                websocket.current?.send(JSON.stringify(messageData));
            }
            //만약 웰컴 메시지라면?
            else if(json.isWelcoming){
                //화면에 메시지 추가
                setChatList(chatList => [...chatList,json.message]);
            }
            //만약 접속자 숫자 갱신이라면?
            else if(json.userCountUpdate){
               //접속자 갱신
                setConnectedClientsCount(json.userCounts);
            }
            //일반 메시지 
            else{
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
            user: inputUserName,
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
        //공백 이름인지 확인.
        if(inputUserName === ''){
            //모달 띄우기
        }
        else{
            //닉네임 있는지 확인
            let jsonResult = await requestGet('/api/user/check?name=' + inputUserName);

            //
            if(jsonResult){
                //닉네임 중복 모달창 띄우기
                console.log(jsonResult);
            }
            else{
                //커넥트 
                //프론트에 닉네임 저장 (secure로컬 스토리지로 변경할까?)
                setUserFiexdNickName(inputUserName);    
                connect();
            }
        }

     
       
    }

    /**
     * useEffect
     */
    useEffect(() => {
        setInputUserName("");
        return () => {
            websocket.current?.close();
        };
    },[]);

    useEffect(()=>{
        if(userFiexdNickName !== "익명"){
            console.log("done!");
        }
    },[userFiexdNickName]);

    const onSetMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    return(
        <div>
            {
                userFiexdNickName === "익명" 
                ?
                <div className="flex flex-col items-center h-dvh justify-center">
                    <div className="flex flex-col bg-teal-600 rounded-md p-10">
                        닉네임을 입력해주세요
                        <TextField label="닉네임" variant="outlined" value={inputUserName} onChange={(event) => setInputUserName(event.target.value)}/>
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
                                <TextField label="메시지" variant="outlined" value={message} onChange={onSetMessage} onKeyDown={(e:React.KeyboardEvent) => handleKeyDownEvent(e)}/>
                                {/* <input placeholder="엔터키 테스트" ></input> */}
                                <Button className="text-black " color="primary" variant="contained" onClick={sendChat} >
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
