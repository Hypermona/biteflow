import { useMemo } from "react";
import {
  Handle,
  HandleProps,
  ReactFlowState,
  getConnectedEdges,
  useNodeId,
  useStore,
} from "reactflow";

interface BlackDotHanlde extends HandleProps {
  maxconnection?: number;
}
const selector = (s: ReactFlowState) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});
export default function BlackDotHanlde(props: Readonly<BlackDotHanlde>) {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo(() => {
    if (typeof props.maxconnection === "number" && nodeId) {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node!], edges);
      // end can be list of source or target
      const end = connectedEdges.filter((edges) => edges[props.type] === node?.id);
      // this will prevent source or target from having the maximum connection then mentioned
      return end.length < props.maxconnection;
    }

    return props.isConnectable;
  }, [nodeInternals, edges, nodeId, props.isConnectable]);

  return (
    <Handle
      style={{
        width: 12,
        height: 12,
      }}
      {...props}
      isConnectable={isHandleConnectable}
    />
  );
}
