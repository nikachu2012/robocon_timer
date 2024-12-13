"use client"

import fillZero from "@/components/fill_zero";
import { Button } from "@/components/ui/button"
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useState, useRef, useEffect, Suspense } from "react";

function Timer() {
    const searchParams = useSearchParams();

    const time = parseInt(searchParams.get("t") || "0") || 0;
    const withMinutes = searchParams.get("m") == "true" ? true : false;

    const [timer, setTimer] = useState<number>(-6);
    const timerRef = useRef(timer)

    const playerRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        timerRef.current = timer;
    }, [timer]);

    useEffect(() => {
        const intervalID = setInterval(() => {
            if ((time - timerRef.current) > 0) {
                setTimer(timer => timer + 1);
            }
            else {
                clearInterval(intervalID);
            }

            if ((time - timerRef.current) == 4 || timerRef.current == -4) {
                console.log("play")

                if (playerRef.current) {
                    playerRef.current.play();
                }
            }
        }, 1000);
        return () => clearInterval(intervalID)
    }, [time]);

    function convert(time: number): string {
        if (timer == -6) {
            return "READY"
        }
        if (timer < 0) {
            return Math.abs(time).toString()
        }
        else if (timer == 0 || timer == 1) {
            return "START"
        }
        else {
            if (withMinutes) {
                return `${fillZero(Math.floor(time / 60).toString(), 1)}:${fillZero((time % 60).toString(), 2)}`
            }
            else {
                return Math.abs(time).toString()
            }
        }
    }

    return <>
        <div className="text-9xl font-bold">{convert(timer)}</div>

        <audio
            src="/timer.wav"
            ref={playerRef}
        />
    </>
}
export default function TimerPage() {

    return <>
        <div className="w-[100vw] h-[100vh] flex items-center justify-center flex-col gap-3">
            <Suspense>
                <Timer />
            </Suspense>

            <Link href={"/"}>
                <Button><Undo2 />戻る</Button>
            </Link>
        </div>
    </>
}
