type LocationGraph = Record<string, string[]>;

export const findCyclesBetweenLocations = (graph: LocationGraph): string[][] => {
  const visited: Record<string, boolean> = {};
  const stack: string[] = [];
  const cycles: string[][] = [];

  function dfs(node: string) {
    if (stack.includes(node)) {
      const cycleStartIndex = stack.indexOf(node);
      cycles.push([...stack.slice(cycleStartIndex), node]);
      return;
    }

    if (visited[node]) {
      return;
    }

    visited[node] = true;
    stack.push(node);

    if (graph[node]) {
      for (const neighbor of graph[node]) {
        dfs(neighbor);
      }
    }

    stack.pop();
  }

  const allNodes = new Set<string>(Object.keys(graph));
  Object.values(graph).forEach((neighbors) => {
      neighbors.forEach((neighbor) => {
      allNodes.add(neighbor);
      });
  });

  console.log(allNodes)
  
  if (allNodes.size !== Object.keys(graph).length) {
      throw new Error('Invalid graph: missing nodes');
  }

  Object.keys(graph).forEach((node) => {
    if (!visited[node]) {
      dfs(node);
    }
  });

  return cycles;
};