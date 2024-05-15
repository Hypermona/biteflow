import { useState, useCallback, DragEvent, useEffect } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  ReactFlowInstance,
  Node,
  useReactFlow,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { toast } from "sonner";

import Sidebar from "@/components/Sidebar";
import TextMessage from "./Nodes/TextMessage";
import Header from "@/components/Header";
import { getId } from "@/lib/utils";
import { FLOW_STORE_KEY, TEXT_NODE_ID } from "./Constants";

// adding custom node
const nodeTypes = {
  [TEXT_NODE_ID]: TextMessage,
};

const ChatFlow = () => {
  const [selected, setSelected] = useState<Node | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
  const { setViewport } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: {
              // this will add arrow at the end of an edge
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
            },
          },
          eds
        )
      ),
    []
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      // retrieving the type of the node dropped
      const type = event.dataTransfer.getData("application/biteFlow");

      // checking if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      if (position) {
        // preparing the node
        const newNode = {
          id: getId(nodes.length),
          type,
          position,
          data: { message: `${type} node`, selected: false },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, nodes]
  );

  const clearSelected = () => {
    setSelected(undefined);
  };
  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSave = useCallback(() => {
    // if one or more nodes are present and not more than one node having target empty, then save else show error toast
    if (nodes.length > 1 && nodes.length - edges.length <= 1) {
      const flowObj = reactFlowInstance?.toObject();
      localStorage.setItem(FLOW_STORE_KEY, JSON.stringify(flowObj));
      toast.success("Successflly Saved Flow");
    } else {
      toast.error("Cannot Save Flow");
    }
  }, [reactFlowInstance, edges, nodes]);

  // once we save every time we refresh we get saved nodes,
  // so i added the clear functionality to clear the added items and local storage
  const handleClearStore = useCallback(() => {
    if (nodes.length <= 0) {
      return toast.warning("No Items to Clear");
    }
    localStorage.removeItem(FLOW_STORE_KEY);
    setNodes([]);
    setEdges([]);
    setSelected(undefined);
    toast.success("Successfully Cleared All The Items");
  }, [nodes]);

  useEffect(() => {
    // update the message state when we select any node
    setNodes((nds) => {
      return nds.map((node) => {
        if (node.id === selected?.id) {
          node.data = {
            ...node.data,
            selected: true,
          };
        } else {
          node.data = {
            ...node.data,
            selected: false,
          };
        }

        return node;
      });
    });
    setMessage(selected?.data?.message);
  }, [selected]);

  useEffect(() => {
    // update selected nodes data when user enter data in the sidebar / nodes panel
    setNodes((nds) => {
      return nds.map((node) => {
        if (node.id === selected?.id) {
          node.data = {
            ...node.data,
            message,
          };
        }
        return node;
      });
    });
  }, [message]);

  useEffect(() => {
    // if local storage has any flow data load them
    const localBiteString = localStorage?.getItem(FLOW_STORE_KEY);
    if (localBiteString) {
      const flow = JSON.parse(localBiteString);
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
        setTimeout(() => toast.info("Restored Flow Successfully")); // this will make sure this code will execute only after mount
      }
    }
  }, []);

  return (
    <>
      <Header handleSave={handleSave} clearStorage={handleClearStore} />
      <div className="sm:flex">
        <div className="h-[70vh] w-[100vw] sm:h-[90vh] sm:w-[80vw] ">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={(_, selected) => {
              setSelected(selected);
            }}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar
          selected={selected}
          clearSelected={clearSelected}
          message={message}
          onMessageChange={onMessageChange}
        />
      </div>
    </>
  );
};

export default ChatFlow;
