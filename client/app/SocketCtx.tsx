"use client"
import { createContext, useContext, useEffect, useState } from "react";

const SocketCtx = createContext<{socket:WebSocket | null}>({socket:null})

export const SocketWrapper = ({children}:{children:React.ReactNode}) => {
  const [ws, setWs] = useState<WebSocket | null>(null)
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000")
    setWs(socket)
    socket.onopen = () => {
      setWs(socket)
      console.log("connected")
    }
    socket.onerror = () => {
      console.log("error")
    }

    return () => {
      console.log("returning")
      socket.close()
    }
  },[])
  return <SocketCtx.Provider value={{ socket: ws }} >{children}</SocketCtx.Provider>
}


export const useSocket = () => useContext(SocketCtx)
