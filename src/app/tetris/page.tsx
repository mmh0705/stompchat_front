"use client";
import { useScrollTrigger } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

type minoXY_Object = {
    x: number,
    y: number
}

export default function About() {
    const router = useRouter();

    const [height, setHeight] = useState(0);
    const [x_axis, set_x_axis] = useState(0);
    const [current_minoXY, setcurrent_MinoXY] = useState<minoXY_Object[]>(
        [
            {x:3, y:0},
            {x:3, y:1},
            {x:4, y:1},
            {x:5, y:1},
        ]
    );

    //4좌표 테스트
    //현재
    const [x1, set_x1] = useState(0);
    const [y1, set_y1] = useState(19);
    
    const [x2, set_x2] = useState(1);
    const [y2, set_y2] = useState(19);
    
    const [x3, set_x3] = useState(2);
    const [y3, set_y3] = useState(19);

    const [x4, set_x4] = useState(3);
    const [y4, set_y4] = useState(19);

    //좌우 체크
    const [leftRightCheck, setLeftRightCheck] = useState(0);

    const [gridList, setGridList] = useState<number[][]>(
        [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            
        ],
    );
    const gridList_ref = useRef<number[][]>();

    const handleKeyDown = (event:KeyboardEvent) => {
        switch(event.key){
            case "ArrowLeft":
                onArrowLeftClick();
                break;
            case "ArrowRight":
                onArrowRightClick();
                break;
            case "ArrowDown":
                console.log("아래 이동 (가속)");
                break;
            case "ArrowUp":
                console.log("회전");
                break;
            default:
                break;
        }
    }

    const onArrowLeftClick = () => {
        setLeftRightCheck((prev) => prev = -1);
        set_x1((prev) => prev-1);
        set_x2((prev) => prev-1);
        set_x3((prev) => prev-1);
        set_x4((prev) => prev-1);
    }

    const onArrowRightClick = () => {
        setLeftRightCheck((prev) => prev = 1);
        set_x1((prev) => prev+1);
        set_x2((prev) => prev+1);
        set_x3((prev) => prev+1);
        set_x4((prev) => prev+1);
    }

    const brickDown = () => {
        //첫 시작이라면, 브릭의 종류를 정한다. ㄴ자로 해보자 일단

        //브릭의 현재 좌표를 확인한다.
        //브릭의 현재 좌표를 0으로 만들고 row가 하나씩 증가 되어서 1을 넣어준다.
        
        
        // setGridList((prevMatrix) => {
        //     return prevMatrix.map((row, rowIndex) => 
        //         row.map((num, colIndex) => 
        //             rowIndex === 0 && colIndex === 0 ? (num === 0 ? 1 : 0)  : num
        //         )
        //     ); 
        // });

        //브릭의 현재 좌표를 0으로 만들고 row가 하나씩 증가 되어서 1을 넣어준다.
        //
    };
    
    useEffect(()=>{
        //왼쪽 벽에 닿음
        if(x1<0 || x2<0 || x3<0 || x4<0){
            set_x1((prev) => prev+1);
            set_x2((prev) => prev+1);
            set_x3((prev) => prev+1);
            set_x4((prev) => prev+1);
        }
        //오른쪽 벽에 닿음
        else if(x1>9 || x2>9|| x3>9 || x4>9 ){
            set_x1((prev) => prev-1);
            set_x2((prev) => prev-1);
            set_x3((prev) => prev-1);
            set_x4((prev) => prev-1);
        }
        //왼쪽 이동 
        else if(leftRightCheck < 0){
            console.log("왼쪽 이동");
            setGridList((prevMatrix) => {
                return prevMatrix.map((row, rowIndex) => 
                    row.map((num, colIndex) => 
                        (
                            rowIndex === y1 && colIndex === x1 //좌표1 그리기
                            ? 1
                            : rowIndex === y2 && colIndex === x2 //좌표2 그리기
                            ? 1
                            : rowIndex === y3 && colIndex === x3 //좌표3 그리기
                            ? 1
                            : rowIndex === y4 && colIndex === x4 //좌표4 그리기
                            ? 1
                            
                            :rowIndex === y1 && colIndex === x1+1 //좌표1 지우기
                            ? 0
                            : rowIndex === y2 && colIndex === x2+1 //좌표2 지우기
                            ? 0
                            : rowIndex === y3 && colIndex === x3+1 //좌표3 지우기
                            ? 0
                            : rowIndex === y4 && colIndex === x4+1 //좌표4 지우기
                            ? 0
                            : num
                        ) 
                    )
                ); 
            });
        }
        //오른쪽 이동 (오른쪽쪽 벽에 닿으면 실행 X)
        else if(leftRightCheck > 0){
            console.log("오른쪽 이동");

            setGridList((prevMatrix) => {
                return prevMatrix.map((row, rowIndex) => 
                    row.map((num, colIndex) => 
                        (
                            rowIndex === y1 && colIndex === x1 //좌표1 그리기
                            ? 1
                            : rowIndex === y2 && colIndex === x2 //좌표2 그리기
                            ? 1
                            : rowIndex === y3 && colIndex === x3 //좌표3 그리기
                            ? 1
                            : rowIndex === y4 && colIndex === x4 //좌표4 그리기
                            ? 1

                            :rowIndex === y1 && colIndex === x1-1 //좌표1 지우기
                            ? 0
                            : rowIndex === y2 && colIndex === x2-1 //좌표2 지우기
                            ? 0
                            : rowIndex === y3 && colIndex === x3-1 //좌표3 지우기
                            ? 0
                            : rowIndex === y4 && colIndex === x4-1 //좌표4 지우기
                            ? 0
                            : num
                        ) 
                    )
                ); 
            });
        }
        //아래로 이동
        else if(leftRightCheck === 0){
            setGridList((prevMatrix) => {
                return prevMatrix.map((row, rowIndex) => 
                    row.map((num, colIndex) => 
                        (
                            rowIndex === y1 && colIndex === x1 //좌표1 그리기
                            ? 1
                            : rowIndex === y2 && colIndex === x2 //좌표2 그리기
                            ? 1
                            : rowIndex === y3 && colIndex === x3 //좌표3 그리기
                            ? 1
                            : rowIndex === y4 && colIndex === x4 //좌표4 그리기
                            ? 1
                            
                            : rowIndex === y1-1 && colIndex === x1 //좌표1 지우기
                            ? 0
                            : rowIndex === y2-1 && colIndex === x2 //좌표2 지우기
                            ? 0
                            : rowIndex === y3-1 && colIndex === x3 //좌표3 지우기
                            ? 0
                            : rowIndex === y4-1 && colIndex === x4 //좌표4 지우기
                            ? 0
                            : num
                        ) 
                    )
                ); 
            });
        }
        

        
    },[x1,x2,x3,x4,y1,y2,y3,y4]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        const intervalId = setInterval(() => {
            setLeftRightCheck((prev) => prev = 0);
            set_y1((prev) => prev < 19 ? prev + 1 : prev - 19);
            set_y2((prev) => prev < 19 ? prev + 1 : prev - 19);
            set_y3((prev) => prev < 19 ? prev + 1 : prev - 19);
            set_y4((prev) => prev < 19 ? prev + 1 : prev - 19);

            brickDown();
        }, 400);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    return (
        //화면에 꽉차게 하기 위한 calc를 적용한 height
        <div className="min-h-[calc(100vh-120px)]"  
            style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexDirection: 'column'
        }}>
            {
                gridList.map((row, rowIndex) => (
                    <div 
                        key={rowIndex}
                        style={{
                            display:'flex',
                            flexDirection: 'row',
        
                    }}>
                        {
                            row.map((cell, colIndex) => (
                                <div 
                                    key={colIndex}
                                    style={{
                                        height:'20px',
                                        width:'20px',
                                        border:'1px solid #808080',
                                        backgroundColor:'black'
                                }}>
                                    {
                                        cell == 1 ?
                                        <div style={{
                                            backgroundColor:'brown',
                                            borderRadius:'3px',
                                            height:'100%',
                                            width:'100%'
                                        }}></div> 
                                        :
                                        <>
                                            
                                        </>
                                    }
                                </div>
                            ))
                        }
                    </div>
                ))
            }

            <div>
                <button style={{backgroundColor:'purple', color:'white', padding:'5px', borderRadius:'5px'}} onClick={() => onArrowLeftClick()}>왼쪽</button>
                <button style={{backgroundColor:'purple', color:'white', padding:'5px', borderRadius:'5px'}} onClick={() => onArrowRightClick()}>오른쪽</button>
            </div>
        </div>
    );
}
