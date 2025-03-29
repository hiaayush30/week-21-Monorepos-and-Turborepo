"use client"

import { use } from "react"

function Chat({ params }: any) {
    const { roomCode } = use(params) as {roomCode:string};
    return (
        <section className="h-screen bg-yellow-300 flex flex-col justify-between">
            <div className="h-[20vh] bg-green-500 overflow-y-auto flex items-center justify-center">
                <h2 className="text-4xl font-semibold">
                    <span className="font-normal">Room Code: &nbsp;</span>{roomCode}
                </h2> 
            </div>
            <div className="h-[70vh] bg-red-500 overflow-y-auto mx-50 rounded-lg">
                
            </div>
            <div className="h-[10vh] bg-orange-500"></div>
        </section>
    )
}

export default Chat
