import CryptoJS from "crypto-js";

class Block {
  constructor(
    public index: number,
    public hash: string,
    public previousHash: string,
    public data: string,
    public timestamp: number
  ) {}

  static calculateBlockHash(index: number, previousHash: string, timestamp: number, data: string): string {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
  } 
}

const genesisBlock: Block = new Block(0, "asklfjaskldfjsla", "", "hello", (+new Date));

const blockChain: Block[] = [genesisBlock];