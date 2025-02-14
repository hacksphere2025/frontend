import React, { useEffect, useState } from "react";
import { JSX } from "react";
import MessageBubble, { LoadingChatBubble } from "./components/MessageBubble";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api/App";
import { MessageUserType } from "@/types/Functions/Message";
import { ChatDataType, MessageCategory } from "@/types/Functions/ChatBox";
import { useUser } from "@/provider/userProvider/App";
import { useParams } from "react-router-dom";

export default function ChatBox(): JSX.Element {
  const { sessionId } = useParams();

  const toast = useToast();
  const { user } = useUser();

  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ChatDataType[]>([]);
  //window.history.replaceState(null, "", "/new-path");

  React.useEffect(() => {
    if (sessionId != undefined) {
      setCurrentSessionId(sessionId);
      fetchSessionData(sessionId);
    }
  }, [sessionId]);

  const fetchSessionData = async (string: sessionId) => {
    const response = await api.get(`/session/${sessionId}`);
    if (response.status == 200) {
      const chatData: ChatDataType[] = [];
      const payload = response.data.data.message;
      payload.map((ele) => {
        if (ele.user == "user") {
          chatData.push({
            user: MessageUserType.user,
            message: ele.message,
            type: MessageCategory.none,
          });
          return;
        }
        if (ele.type == null) {
          chatData.push({
            user: MessageUserType.bot,
            message: ele.message,
            type: MessageCategory.none,
          });
          return;
        }
        if (ele.type == "list_cons") {
          chatData.push({
            user: MessageUserType.bot,
            message: ele.message,
            type: MessageCategory.list_cons,
            data: [...ele.data],
          });
          return;
        }
      });
      setResponse(() => [
        {
          user: MessageUserType.bot,
          message: "Hello. How can I help you today ?",
          type: MessageCategory.none,
        },
        ...chatData,
      ]);
    }
  };

  const fetchChatbotResponse = async (data: string) => {
    try {
      const response = await api.post("/session/message", {
        message: data,
        userType: "Consumer",
        sessionId: sessionId,
      });
      if (response.status == 200) {
        let messageType: MessageCategory | undefined = undefined;
        if (response.data.data.type == "list_cons") {
          console.log("hello");
          messageType = MessageCategory.list_cons;
        } else if (response.data.data.type == "none") {
          messageType = MessageCategory.none;
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
      const payload: ChatDataType = {
        message: "Some Error Occured. Please try again",
        user: MessageUserType.bot,
        type: MessageCategory.none,
      };
      setResponse((prev) => [...prev, payload]);
      console.log(error);
    }
  };

  const appendMessage = async () => {
    if (!user) {
      toast.toast({
        title: "Error",
        description: "Please sign in and try again.",
      });
      return;
    }
    if (userPrompt.trim() == "") {
      toast.toast({ title: "Error", description: "Please enter your query" });
      return;
    }
    const userMsg: ChatDataType = {
      user: MessageUserType.user,
      type: MessageCategory.none,
      message: userPrompt,
    };
    setLoading(true);
    setResponse((prev) => [...prev, userMsg]);
    await fetchChatbotResponse(userPrompt);
    setLoading(false);
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
            {loading && <LoadingChatBubble />}
          </div>
        </div>
        <div className="flex flex-row justify-center m-3">
          <div className="flex flex-row items-center m-2 sm:min-w-[70%] w-full border rounded-lg p-2 space-x-1 h-min">
            <input
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Enter your query"
              className="outline-none w-full h-9 dark:bg-zinc-950"
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
