import React from "react";
import { JSX } from "react";
import MessageBubble from "./components/MessageBubble";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api/App";
import { ChatDataType, MessageCategory } from "@/types/Functions/Chatbot";
import { MessageUserType } from "@/types/Message";

export default function ChatBox(): JSX.Element {
  const [userPrompt, setUserPrompt] = React.useState<string>("");
  const [response, setResponse] = React.useState<ChatDataType[]>([
    {
      user: MessageUserType.bot,
      message: "Hello. How can I help you today ?",
      type: MessageCategory.none,
    },
  ]);

  const toast = useToast();

  const fetchData = async (data: string) => {
    try {
      const response = await api.post("/chatbot/query", {
        query: data,
        userType: "Consumer",
      });
      if (response.status == 200) {
        console.log(response.data);
        let messageType: MessageCategory | undefined = undefined;
        if (response.data.data.type == "list_cons") {
          console.log("hello");
          messageType = MessageCategory.list_cons;
        }
        const payload: ChatDataType = {
          message: response.data.message,
          user: MessageUserType.bot,
          type: messageType!,
          data: response.data.data.data,
        };
        setResponse((prev) => [...prev, payload]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const appendMessage = async () => {
    if (userPrompt.trim() == "") {
      toast.toast({ title: "Error", description: "Please enter your query" });
      return;
    }
    const userMsg: ChatDataType = {
      user: MessageUserType.user,
      type: MessageCategory.none,
      message: userPrompt,
    };
    setResponse((prev) => [...prev, userMsg]);
    await fetchData(userPrompt);
    setUserPrompt("");
  };

  return (
    <>
      <div className="flex flex-col md:min-w-[60%] w-full h-full justify-between">
        <div className="flex flex-col items-center p-3">
          <div className="sm:min-w-[70%] w-full space-y-10 overflow-y-auto max-h-[80vh] no-scrollbar">
            {response.map((ele, val) => (
              <MessageBubble data={ele} key={val} />
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-center m-3">
          <div className="flex flex-row items-center m-2 sm:min-w-[70%] w-full border rounded-lg p-2 space-x-1 h-min">
            <input
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Enter your query"
              className="outline-none w-full h-9 dark:bg-black"
            />
            <Button className="rounded-lg" onClick={() => appendMessage()}>
              <Send />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
