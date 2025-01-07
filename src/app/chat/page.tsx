'use client';

import { useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";

export default function Chat() {   
    const [client, setClient] = useState<StompJs.Client | null>(null);
    const [name, setName] = useState("");
    const [messageList, setMessageList] = useState<string[]>(['ok']);
    /**
     * 연결
     */
    const connect = () =>{
        //소켓 연결
        try{
            const stompClient = new StompJs.Client({
                //brokerURL: "ws://121.162.75.86:8080/gs-guide-websocket",
                brokerURL: "ws://localhost:8080/gs-guide-websocket",
                reconnectDelay: 5000, // 자동 재 연결
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });
            
            setClient(stompClient);
            
            stompClient.onConnect = (frame) =>{
                console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/greetings', (greeting) =>{
                    showGreeting(JSON.parse(greeting.body).content);
                });
            }

            stompClient.activate();

        }
        catch(err){
            console.error(err);
        }
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
        if(client === null){
            return;
        }
        console.log("sendChat");
        client.publish({
            destination: "/app/hello",
            body: JSON.stringify({name: name})
        });
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

    return(
        <div>
            하이용 : 
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
    );
}   