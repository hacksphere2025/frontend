import { Input } from "@/components/ui/input";
import React from "react";
import { JSX } from "react";
import MessageBubble from "./components/MessageBubble";
import Table from "./components/Table/App";

enum MessageUserType {
  user,
  bot,
}

export default function ChatBox(): JSX.Element {
  type inp = {
    userType: MessageUserType;
    data: string;
  };
  const [response, setResponse] = React.useState<inp[]>([
    {
      userType: MessageUserType.bot,
      data: "Hello. How can I help you today ?",
    },
  ]);

  const [userPrompt, setUserPrompt] = React.useState<string>("");

  const appendMessage = () => {
    const userMsg: inp = {
      userType: MessageUserType.user,
      data: userPrompt,
    };
    setResponse((prev) => [...prev, userMsg]);
    setUserPrompt("");
  };

  return (
    <>
      <div className="flex flex-col h-full justify-end">
        <div className="h-full flex flex-col w-full items-center p-3">
          <div className="sm:w-[70%] w-full space-y-10">
            {response.map((ele, val) => (
              <MessageBubble
                userType={ele.userType}
                data={ele.data}
                key={val}
              />
            ))}
            <Table />
          </div>
        </div>
        <div className="flex flex-row justify-center m-3">
          <div className="sm:w-[70%] w-full m-2">
            <Input
              type="text"
              value={userPrompt}
              onChange={(e) => {
                setUserPrompt(e.target.value);
              }}
              onSubmit={() => appendMessage()}
              placeholder="Enter a Search query"
              className="rounded-[100px] text-lg h-[4vh]"
            />
            <button
              onClick={() => {
                appendMessage();
              }}
            >
              hello
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
