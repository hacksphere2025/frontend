import CustomAvatar from "@/my-components/Avatar/App";
import { JSX } from "react";
import Table from "./Table/App";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatDataType, MessageCategory } from "@/types/Functions/ChatBox";
import { MessageUserType } from "@/types/Functions/Message";

export default function MessageBubble({
  data,
}: {
  data: ChatDataType;
}): JSX.Element {
  return (
    <>
      {data.user == MessageUserType.user ? (
        <div className="max-w-[80%] text-left flex flex-row">
          <CustomAvatar url="RS" />
          <div className="border rounded-lg p-3 m-2 dark:bg-zinc-800 bg-gray-400">
            {data.message}
          </div>
        </div>
      ) : (
        <>
          {data.type == MessageCategory.list_cons && (
            <>
              <div className="w-full flex ">
                <div className="text-left flex flex-row max-w-[80%]">
                  <CustomAvatar url="B" />
                  <div className="border rounded-lg p-3 m-2 dark:bg-zinc-800 bg-gray-200">
                    {data.message}
                  </div>
                </div>
              </div>
              <Table product={data.data!} />
            </>
          )}

          {data.type == MessageCategory.none && (
            <div className="w-full flex-row">
              <div className="text-left flex flex-row max-w-[80%]">
                <CustomAvatar url="B" />
                <div className="border rounded-lg p-3 m-2 dark:bg-zinc-800 bg-gray-200">
                  {data.message}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export function LoadingChatBubble(): JSX.Element {
  return (
    <>
      <div className="max-w-[80%] text-left flex flex-row">
        <CustomAvatar url="B" />
        <Skeleton className=" h-[50px] w-[250px] border rounded-lg p-3 m-2 dark:bg-zinc-800 bg-gray-200" />
      </div>
    </>
  );
}
