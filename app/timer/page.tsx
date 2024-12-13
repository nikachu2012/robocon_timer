"use client"

import { Button } from "@/components/ui/button"
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useState, useRef, useEffect } from "react";

export default function TimerPage() {
    const searchParams = useSearchParams();
    const time = parseInt(searchParams.get("t") || "0") || 0;

    const [timer, setTimer] = useState<number>(-6);
    const timerRef = useRef(timer)

    const playerRef = useRef(null);

    useEffect(() => {
        timerRef.current = timer;
    }, [timer]);

    useEffect(() => {

        const intervalID = setInterval(() => {
            console.log("setinterval called")
            if ((time - timerRef.current) > 0) {
                setTimer(timer => timer + 1);
            }
            else {
                clearInterval(intervalID);
            }

            if ((time - timerRef.current) == 4) {
                console.log("play")

                // if (playerRef.current != null)
                playerRef.current.play();
            }

            console.log("looppp")
        }, 1000);
        return () => clearInterval(intervalID)
    }, []);


    return <>
        <div className="w-[100vw] h-[100vh] flex items-center justify-center flex-col gap-3">
            <div className="text-9xl font-bold">{timer == -6 ? "READY" : (timer == 0 || timer == 1) ? "START" : Math.abs(timer)}</div>
            <audio
                src="/jihou.mp3"
                ref={playerRef}
            />

            <Link href={"/"}>
                <Button><Undo2 />戻る</Button>
            </Link>
        </div>
    </>
}
