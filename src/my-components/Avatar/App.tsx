import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JSX } from "react";

interface CustomAvatar {
  url: string
}
export default function CustomAvatar({ url }: CustomAvatar): JSX.Element {
  return (
    <Avatar>
      <AvatarImage src={url} alt="@shadcn" />
      <AvatarFallback>{url}</AvatarFallback>
    </Avatar>
  );
}
