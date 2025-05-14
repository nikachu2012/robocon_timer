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
import { Checkbox } from "@/components/ui/checkbox"
import { Timer } from "lucide-react"
import { useState } from "react"
import Link from "next/link";


export default function Home() {
  const [time, setTime] = useState<number>(180);
  const [isMinutes, setIsMinutes] = useState<boolean>(false);
  const [isShowPoint, setIsShowPoint] = useState<boolean>(false);
  const [leftTeamName, setLeftTeamName] = useState<string>("チームA");
  const [rightTeamName, setRightTeamName] = useState<string>("チームB");

  const addTime = (timedelta: number) => {
    if ((time + timedelta) < 0) {
      setTime(0);
      return;
    }

    setTime((time) => time + timedelta)
  };


  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center ">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>ロボコンタイマー</CardTitle>
          <CardDescription>version 1.0 <a className="underline" href="https://github.com/nikachu2012/robocon_timer" target="_blank">repository</a></CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="saveName">時間</Label>
            <Input type="number" id="saveName" min={0} value={time} onChange={e => setTime(parseInt(e.target.value) || 0)} className="w-full" />
          </div>

          <div className="flex w-full *:flex-grow gap-0.5">
            <Button variant="secondary" onClick={() => addTime(-30)}>-60s</Button>
            <Button variant="secondary" onClick={() => addTime(-20)}>-30s</Button>
            <Button variant="secondary" onClick={() => addTime(-10)}>-10s</Button>
            <Button variant="secondary" onClick={() => addTime(-10)}> -5s</Button>

            <Button variant="secondary" onClick={() => addTime(5)}> -5s</Button>
            <Button variant="secondary" onClick={() => addTime(10)}>+10s</Button>
            <Button variant="secondary" onClick={() => addTime(20)}>+20s</Button>
            <Button variant="secondary" onClick={() => addTime(30)}>+30s</Button>
          </div>

          <div className="flex items-center space-x-2 pt-4 ml-1">
            <Checkbox id="terms" onCheckedChange={e => setIsMinutes(e == "indeterminate" ? false : e)} defaultChecked={false} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              分秒表示にする
            </label>
          </div>

          <div className="flex items-center space-x-2 pt-4 ml-1">
            <Checkbox id="showPoint" onCheckedChange={e => setIsShowPoint(e == "indeterminate" ? false : e)} defaultChecked={false} />
            <label
              htmlFor="showPoint"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              点数を表示する
            </label>
          </div>

          <div className="flex gap-1">
            <div className="grid w-full max-w-sm items-center gap-1.5 pt-4">
              <Label htmlFor="teamLeft">左側チーム名(赤)</Label>
              <Input type="text" id="teamLeft" placeholder="チームA" disabled={!isShowPoint} onChange={e => setLeftTeamName(e.target.value)} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pt-4">
              <Label htmlFor="teamRight">右側チーム名(青)</Label>
              <Input type="text" id="teamRight" placeholder="チームB" disabled={!isShowPoint} onChange={e => setRightTeamName(e.target.value)} />
            </div>
          </div>

        </CardContent>
        <CardFooter>
          <Link href={{
            pathname: "timer",
            query: {
              "t": time.toString(),
              "m": isMinutes ? "true" : "false",
              "p": isShowPoint ? "true" : "false",
              "lt": encodeURIComponent(leftTeamName),
              "rt": encodeURIComponent(rightTeamName)
            }
          }}
          >
            <Button className="w-full"><Timer />スタート</Button>
          </Link>
        </CardFooter>
      </Card>

    </div >
  );
}
