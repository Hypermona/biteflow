import { Card } from "@/components/ui/card";
import { NodeProps, Position } from "reactflow";
import MessageIcon from "../../assets/message.svg";
import WhatsappIcon from "../../assets/whatsapp.svg";
import BlackDotHanlde from "../Handles/BlackDotHanlde";

export default function TextMessage({
  data: { message, selected },
}: NodeProps<{
  message: string;
  selected: boolean;
}>) {
  return (
    <Card className={"rounded-md shadow-lg" + (selected ? " border-blue-800" : "")}>
      <div className="p-1 px-3 w-[310px] bg-green-200 rounded-t-md flex justify-between">
        {" "}
        <div className="flex items-center">
          <img src={MessageIcon} alt="message icon" className="w-4 h-4" />
          <div className="ml-1">Send Message</div>
        </div>
        <img src={WhatsappIcon} alt="whats app icon" className="w-5 h-5" />
      </div>
      <div className="p-3 py-4 text-sm">{message}</div>
      {/* adding the custom handles */}
      {/* maxconnection prop helps to restrict the maximum number of connection a handle can have */}
      <BlackDotHanlde type="source" position={Position.Right} maxconnection={1} />
      <BlackDotHanlde type="target" position={Position.Left} />
    </Card>
  );
}
