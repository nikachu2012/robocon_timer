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
    const searchParams = useSearchParams();
    // ポイント表示
    const showPoint = searchParams.get("p") == "true" ? true : false;
    const leftTeamName = decodeURIComponent(searchParams.get("lt") || encodeURIComponent("チームA"));
    const rightTeamName = decodeURIComponent(searchParams.get("rt") || encodeURIComponent("チームB"));

    const [leftPoint, setLeftPoint] = useState<number>(0);
    const addLeftPoint = (timedelta: number) => {
        if ((leftPoint + timedelta) < 0) {
            setLeftPoint(0);
            return;
        }
        setLeftPoint((time) => time + timedelta)
    };
    const [rightPoint, setRightPoint] = useState<number>(0);
    const addRightPoint = (timedelta: number) => {
        if ((rightPoint + timedelta) < 0) {
            setRightPoint(0);
            return;
        }
        setRightPoint((time) => time + timedelta)
    };

    return <>
        <div className="w-[100svw] h-[100svh] flex flex-col">
            {showPoint ?
                <div className="w-[100svw] flex gap-1">
                    <div className="w-[50svw] bg-[#EF0E0F]">
                        <PointView point={leftPoint} teamName={leftTeamName} />
                    </div>
                    <div className="w-[50svw] bg-[#0E7FED]">
                        <PointView point={rightPoint} teamName={rightTeamName} />
                    </div>
                </div>
                : <></>}
            <div className="w-full h-full flex items-center justify-center flex-col gap-3">
                <Suspense>
                    <Timer />
                </Suspense>

                <Link href={"/"}>
                    <Button><Undo2 />戻る</Button>
                </Link>
            </div>

            {showPoint ?
                <div className="w-[100svw] flex justify-between">
                    <div className="w-[40svw] m-5">
                        <div className="flex w-full *:flex-grow gap-0.5">
                            <Button variant="secondary" onClick={() => addLeftPoint(-100)}>-100</Button>
                            <Button variant="secondary" onClick={() => addLeftPoint(-60)}>-60</Button>
                            <Button variant="secondary" onClick={() => addLeftPoint(-40)}>-40</Button>
                            <Button variant="secondary" onClick={() => addLeftPoint(-10)}>-10</Button>

                            <Button variant="secondary" onClick={() => addLeftPoint(10)}>+10</Button>
                            <Button variant="secondary" onClick={() => addLeftPoint(40)}>+40</Button>
                            <Button variant="secondary" onClick={() => addLeftPoint(60)}>+60</Button>
                            <Button variant="secondary" onClick={() => addLeftPoint(100)}>+100</Button>
                        </div>
                    </div>
                    <div className="w-[40svw] m-5">
                        <div className="flex w-full *:flex-grow gap-0.5">
                            <Button variant="secondary" onClick={() => addRightPoint(-100)}>-100</Button>
                            <Button variant="secondary" onClick={() => addRightPoint(-60)}>-60</Button>
                            <Button variant="secondary" onClick={() => addRightPoint(-40)}>-40</Button>
                            <Button variant="secondary" onClick={() => addRightPoint(-10)}>-10</Button>

                            <Button variant="secondary" onClick={() => addRightPoint(10)}>+10</Button>
                            <Button variant="secondary" onClick={() => addRightPoint(40)}>+40</Button>
                            <Button variant="secondary" onClick={() => addRightPoint(60)}>+60</Button>
                            <Button variant="secondary" onClick={() => addRightPoint(100)}>+100</Button>
                        </div>
                    </div>
                </div>
                : <></>}
        </div>

    </>
}

function PointView({ point, teamName }: { point: number, teamName: string }) {
    return <>
        <div className="flex flex-col items-center p-3">
            <div className="m-[10px] w-full bg-black text-center py-3 text-white text-9xl font-semibold">
                {point}
            </div>
            <div className="font-extrabold text-4xl py-1">{teamName}</div>
        </div>
    </>
}
