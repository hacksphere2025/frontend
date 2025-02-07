import CustomAvatar from "@/my-components/Avatar/App";
import { MessageUserType } from "@/types/Message";
import { JSX } from "react";

export default function MessageBubble({ userType, data }: { userType: MessageUserType, data: string }): JSX.Element {
  return (
    <>
      {
        userType == MessageUserType.bot ?
          <div className="max-w-[80%] text-left flex flex-row">
            <CustomAvatar url="B" />
            <div className="border rounded-lg p-3 m-2 dark:bg-zinc-800 bg-gray-200">
              {data}
            </div>
          </div> :
          <div className="w-full flex flex-row-reverse">
            <div className="text-left flex flex-row-reverse max-w-[80%]">
              <CustomAvatar url="RS" />
              <div className="border rounded-lg p-3 m-2 dark:bg-zinc-800 bg-gray-200">
                {data}
              </div>
            </div>
          </div>
      }
    </>
  );
}
