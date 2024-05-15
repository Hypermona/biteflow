import { DragEvent } from "react";
import { Card, CardContent } from "./ui/card";
import { Node } from "reactflow";
import EditTextMessage from "./EditTextMessage";
import { NODES_PANEL, TEXT_NODE_ID } from "@/Flows/Constants";

interface ISideBar {
  selected: Node | undefined;
  clearSelected: () => void;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  message: string;
}

const Sidebar = ({ selected, clearSelected, onMessageChange, message }: ISideBar) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/biteFlow", nodeType); // helps to pass some data while dragging, this later we can used inside drag drop event
    event.dataTransfer.effectAllowed = "move";
  };

  if (selected?.id) {
    // using switch, we can return more editors based on the type
    switch (selected.type) {
      case TEXT_NODE_ID:
        return (
          <aside className="border-t-2 sm:border-l-2">
            <EditTextMessage
              selected={selected}
              clearSelected={clearSelected}
              message={message}
              onMessageChange={onMessageChange}
            />
          </aside>
        );
      default:
        return null;
    }
  } else {
    return (
      <aside className="border-t-2 sm:border-l-2">
        {/* rendering the nodes mentioned inside NODE_PANEL */}
        {NODES_PANEL.map((node) => (
          <Card
            key={node.id}
            className="rounded-sm border-blue-600 text-blue-600 m-2 w-[200px]"
            onDragStart={(event) => onDragStart(event, node.id)} // when the user drags the node, we call drag event with node id
            draggable
          >
            <CardContent className="flex flex-col items-center p-5 px-8 ">
              <img src={node.logo} alt="message icon" className="w-6 h-6 text-blue-600" />
              <div className="mt-2">{node.label}</div>
            </CardContent>
          </Card>
        ))}
      </aside>
    );
  }
};

export default Sidebar;
