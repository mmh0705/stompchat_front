"use client";
import { useState } from "react";

export const Counter = () => {
    console.log("Counter component rendered");
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Clicked {count} times!</button>
        </div>
    );
};