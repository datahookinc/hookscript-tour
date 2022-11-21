declare global {
  type Results = {
    data: any[][];
    attributes: string[];
    dTypes: number[];
  };

  function RunScript(s: string): Promise<Results>;
}

export {};
