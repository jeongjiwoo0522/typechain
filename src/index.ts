import { v4 } from "uuid";

class Block {
  constructor(
    public index: number,
    public hash: string,
    public previousHash: string,
    public data: string,
    public timestamp: number
  ) {}
}

const genesisBlock: Block = new Block(0, v4(), "", "hello", (+new Date));