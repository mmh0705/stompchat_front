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

    const [current_minoXY, setcurrent_MinoXY] = useState<minoXY_Object[]>(
        [
            {x:3, y:0},
            {x:3, y:1},
            {x:4, y:1},
            {x:5, y:1},
        ]
    );

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
        console.log(height);
        for(let i = 0; i < 4;  i++){
            setGridList((prevMatrix) => {
                return prevMatrix.map((row, rowIndex) => 
                    row.map((num, colIndex) => 
                        (
                            rowIndex === height && colIndex === i 
                            ? 1  
                            : rowIndex === height-1 && colIndex === i 
                            ? 0
                            : height === 0 && (rowIndex === 19 && colIndex === i)
                            ? 0
                            : num
                        ) 
                    )
                ); 
            });
        }
    },[height]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            //setcurrent_MinoXY((prevMino) => (, prevMino));
            setHeight((prev) => prev < 19 ? prev + 1 : prev - 19);
            brickDown();
        }, 400);

        return () => clearInterval(intervalId);
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
                                        height:'27px',
                                        width:'27px',
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
        </div>
    );
}
