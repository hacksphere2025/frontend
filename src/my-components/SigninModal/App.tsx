import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { JSX } from "react";

export default function SiginInModal({ onClickReference }: {
  onClickReference: React.RefObject<HTMLButtonElement | null>
}): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger className="hidden" ref={onClickReference}>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <div className="grid w-full max-w-sm items-center gap-1.5 space-y-10">
              <Input type="email" id="email" placeholder="Email" />
              <Input type="email" id="email" placeholder="Email" />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
