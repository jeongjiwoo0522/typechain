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

  static validateStructure(aBlock: Block): boolean {
    return typeof aBlock.index === "number"
    && typeof aBlock.data === "string"
    && typeof aBlock.hash === "string"
    && typeof aBlock.previousHash === "string"
    && typeof aBlock.timestamp === "number";
  }
}

const genesisBlock: Block = new Block(0, "10101101010101001101010101001", "", "hello", (+new Date));

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
const getNewTimeStamp = (): number => +new Date();

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const nextHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
  const newBlock: Block = new Block(newIndex, nextHash, previousBlock.hash, data, newTimeStamp);
  addBlock(newBlock);
  return newBlock;
};

const getHashForBlock = (aBlock: Block): string => {
  return Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
}

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if(!Block.validateStructure(candidateBlock)) {
    return false;
  } else if(previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if(previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if(getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if(isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
} 