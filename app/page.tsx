"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Timer } from "lucide-react"
import { useState } from "react"
import Link from "next/link";


export default function Home() {
  const [time, setTime] = useState(300);
  const addTime = (timedelta: number) => {
    if ((time + timedelta) < 0) {
      setTime(0);
      return;
    }

    setTime((time) => time + timedelta)
  };


  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center ">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>ロボコンタイマー</CardTitle>
          <CardDescription>version 1.0 <a className="underline" href="https://github.com/nikachu2012/robocon_timer" target="_blank">repository</a></CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="saveName">時間</Label>
            <Input type="number" id="email" min={0} value={time} onChange={e => setTime(parseInt(e.target.value) || 0)} className="w-full" />
          </div>

          <div className="flex w-full *:flex-grow gap-0.5">
            <Button variant="secondary" onClick={() => addTime(-60)}>-60s</Button>
            <Button variant="secondary" onClick={() => addTime(-30)}>-30s</Button>
            <Button variant="secondary" onClick={() => addTime(-10)}>-10s</Button>
            <Button variant="secondary" onClick={() => addTime(10)}>+10s</Button>
            <Button variant="secondary" onClick={() => addTime(30)}>+30s</Button>
            <Button variant="secondary" onClick={() => addTime(60)}>+60s</Button>
          </div>

        </CardContent>
        <CardFooter>
          <Link href={{ pathname: "timer", query: { "t": time.toString() } }}>
            <Button className="w-full"><Timer />スタート</Button>
          </Link>
        </CardFooter>
      </Card>

    </div>
  );
}
