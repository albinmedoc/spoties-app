export const getNodesFromConnections = <T>(connections: {edges: {node: T}[]}) => {
  if (!connections) return [];
  return connections.edges.map(({ node }) => node);
};
