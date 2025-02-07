import { Input } from "@/components/ui/input";
import React from "react";
import { JSX } from "react";
import MessageBubble from "./components/MessageBubble";
import { MessageUserType } from "@/types/Message";

export default function ChatBox(): JSX.Element {
  const [response, setResponse] = React.useState<[]>([
    {
      userType: MessageUserType.bot,
      data: "Hello. How can I help you today ?"
    }
  ]);

  return (
    <>
      <div className="flex flex-col h-full justify-end">
        <div className="h-full flex flex-col w-full items-center p-3">
          <div className="sm:w-[70%] w-full space-y-10">
            {
              response.map((ele, val) => (
                <MessageBubble userType={ele.userType} data={ele.data} key={val} />
              ))
            }
          </div>
        </div>
        <div className="flex flex-row justify-center m-3">
          <div className="sm:w-[70%] w-full">
            <Input
              placeholder="Enter a Search query"
              className="rounded-[100px] text-lg h-[6vh]" />
          </div>
        </div>
      </div>
    </>
  );
};
