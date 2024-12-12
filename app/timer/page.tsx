"use client"

import { Button } from "@/components/ui/button"
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useState, useRef, useEffect } from "react";

export default function TimerPage() {
    const searchParams = useSearchParams();
    const time = parseInt(searchParams.get("t") || "0") || 0;

    const [timer, setTimer] = useState<number>(time);
    const timerRef = useRef(timer)

    useEffect(() => {
        timerRef.current = timer;
    }, [timer]);

    useEffect(() => {
        setTimer(time);

        const intervalID = setInterval(() => {
            if (timerRef.current > 0) {
                setTimer(timer => timer - 1);
            }
            else {
                clearInterval(intervalID);
            }
            console.log("looppp")
        }, 1000);

        return () => clearInterval(intervalID)
    }, []);


    return <>
        <div className="w-[100vw] h-[100vh] flex items-center justify-center flex-col gap-3">
            <div className="text-9xl font-bold">{timer}</div>

            <Link href={"/"}>
                <Button><Undo2 />戻る</Button>
            </Link>
        </div>
    </>
}
