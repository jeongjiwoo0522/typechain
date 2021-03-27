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

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
const getNewTimeStamp = (): number => +new Date();