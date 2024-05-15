import { ReactFlowProvider } from "reactflow";
import ChatFlow from "./Flows/ChatFlow";
import { Toaster } from "./components/ui/sonner";

// Steps to add a new Node.
// Create new Node componet and add it inside nodes folder
// then import it inside the chatFlow.tsx file and add it inside the nodeTypes obejct with a key
// inside constant.tsx file then update the NODES_PANEL Array with a new object having  an id property with a value key as mentioned in nodeTypes
// create a new editor for the node and add it inside the sideBar component
function App() {
  return (
    <main>
      <ReactFlowProvider>
        <ChatFlow />
      </ReactFlowProvider>
      <Toaster position="top-center" richColors />
    </main>
  );
}

export default App;
