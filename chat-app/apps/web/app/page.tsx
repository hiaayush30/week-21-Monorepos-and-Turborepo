"use client"
import { useEffect, useState } from "react"
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

const Home = () => {
  const [code, setCode] = useState("");
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const router = useRouter();

  const handleJoin = async () => {
    if (code.trim().length !== 4) {
      return alert("Enter a valid code")
    } else {
      const socket = new WebSocket("http://localhost:4000");
      socket.onopen = () => {
        setSocket(socket);
        socket.send(JSON.stringify({
          type: "join",
          roomCode: code
        }));
      }
      socket.onmessage = (message => {
        const data = JSON.parse(message.data);
        if (data.roomId) {
          alert("you joined :" + data.roomId);
          router.replace(`/${data.roomId}`)
        }
      })
    }
  }
  const handleNew = async () => {
    const socket = new WebSocket("http://localhost:4000");
    socket.onopen = () => {
      setSocket(socket);
      socket.send(JSON.stringify({
        type: "join"
      }));
    }
    socket.onmessage = (message => {
      const data = JSON.parse(message.data);
      if (data.roomId) {
        alert("you joined :" + data.roomId);
        router.push(`/${data.roomId}`)
      }
    })
  }

  return (
    <div className="bg-stone-800 text-stone-100 min-h-screen p-3 flex flex-col justify-center items-center">
      <h1 className="text-6xl font-semibold py-5">Chat Room</h1>
      <div>
        <input value={code} onChange={(e) => setCode(e.target.value)}
          type="text" placeholder="Enter code" className="p-1 my-5 border border-stone-200 rounded-lg" />
        <div className="flex gap-10">
          <button onClick={handleJoin}
            className="cursor-pointer p-1 rounded-lg bg-blue-600">Join Room</button>
          <Button onClick={handleNew} appName="web" className="cursor-pointer p-1 rounded-lg bg-blue-600">New Room</Button>
        </div>
      </div>
    </div>
  )
}

export default Home
