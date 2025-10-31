"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { useEffect } from "react";
export default function ChatPage() {
  const messageRef = useRef(null);
  const nameRef = useRef(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    nameRef.current.focus();
  }, []);
  useEffect(() => {
    const interval = setInterval(async () => {
      const rawMessages = fetch("/api/chats", {
        method: "GET",
        cache: "no-cache",
      })
        .then((response) => response.json())
        .then((data) => setMessages(data));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function sendMessage() {
    if (nameRef.current.value.trim() == "") {
      alert("Type in your name first!");
      return;
    }
    if (messageRef.current.value.trim() == "") {
      alert("You can't send a blank message!");
      return;
    }
    console.log(messageRef.current.value);
    // Send message to chats API route
    const hours = new Date().getHours().toString();
    const minutes = new Date().getMinutes().toString();
    fetch("/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        message: messageRef.current.value,
        time: `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`,
      }),
    });
    messageRef.current.value = "";
  }
  return (
    <div className="flex flex-col w-full h-full p-4 ">
      <div className="flex-1 flex-col space-y-4 overflow-y-auto mb-4">
        {messages &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`text-white w-2xs border-2 rounded-lg h-fit p-4 bg-card flex flex-col ${
                nameRef.current.value == message.name
                  ? "ml-auto bg-secondary"
                  : "mr-auto bg-accent"
              }`}
            >
              <p className="font-bold">{message.name}</p>
              <div className="pt-2 w-full h-full">
                <p className="break-all">{message.message}</p>
              </div>
              <div className="w-full pt-2 flex justify-end">
                <p>{message.time}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="flex gap-4">
        <Input
          ref={nameRef}
          placeholder="Enter Your Name"
          type="text"
          className={"flex-1"}
        />
        <Input
          ref={messageRef}
          placeholder="Enter a Message"
          className={"flex-3"}
          type="text"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
