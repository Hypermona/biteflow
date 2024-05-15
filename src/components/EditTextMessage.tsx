import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Textarea } from "./ui/textarea";
import { Node } from "reactflow";

interface IEditTextMessage {
  selected: Node | undefined;
  clearSelected: () => void;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  message: string;
}
function EditTextMessage({
  clearSelected,
  selected,
  message,
  onMessageChange,
}: Readonly<IEditTextMessage>) {
  return (
    <div className="w-[100vw] sm:w-[20vw]">
      <div className="relative border-b-2 w-full flex justify-center items-center pb-3 p-3">
        <ArrowLeftIcon className="absolute left-5 cursor-pointer" onClick={clearSelected} />
        <p>Message</p>
      </div>
      <div className="grid w-full gap-2 border-b-2 py-10 p-3">
        <Label htmlFor="message" className="opacity-50">
          Text
        </Label>
        <Textarea
          placeholder="Type your message here."
          id="message"
          rows={4}
          defaultValue={selected?.data?.message}
          value={message}
          onChange={onMessageChange}
        />
      </div>
    </div>
  );
}

export default EditTextMessage;
