import sha256 from "crypto-js/sha256.js";
import { MerkleTree } from "merkletreejs"

/**
 * Block Header structure
 */
export class BlockHeader {
	public index: number;
	public prevHash: string;
	public merkleRoot: string;
	public timestamp: number;
	public difficulty: number;
	public nonce: number;

	constructor(
		index: number,
		prevHash: string,
		merkleRoot: string,
		timestamp: number,
		difficulty: number,
		nonce: number
	) {
		this.index = index;
		this.prevHash = prevHash;
		this.merkleRoot = merkleRoot;
		this.timestamp = timestamp;
		this.difficulty = difficulty;
		this.nonce = nonce;
	}
}

/**
 * Block Structure
 */
export class Block {
	public hash: string;
	public header: BlockHeader;
	public body: string[];

	constructor(hash: string, header: BlockHeader, body: string[]) {
		this.hash = hash;
		this.header = header;
		this.body = body;
	}

	static calHashOfBlock = (blockHeader: BlockHeader): string => {
    // Convert header strings to SHA256 hash
		const headerString: string =
			blockHeader.index +
			blockHeader.prevHash +
			blockHeader.merkleRoot +
			blockHeader.timestamp +
			blockHeader.difficulty +
			blockHeader.nonce;
		const hash = sha256(headerString).toString();
		return hash;
	}

	static calMerkleRoot = (dataArr: string[]) => {
		// Calculate merkleroot with SHA256
		const leaves = dataArr.map(data => sha256(data))
    const merkleTree = new MerkleTree(leaves, sha256)
    const merkleRoot = merkleTree.getRoot().toString('hex')
		return merkleRoot
	}

	static createGenesisBlock = () => {
		const index = 0
    const prevHash = "0".repeat(64)
    const genesisData = ["This is genesis block"]

    // Calculate merkleroot with SHA256
    const merkleRoot = this.calMerkleRoot(genesisData)
    
    let timestamp: number
    let nonce = 0;
		let difficulty = 1;
    
    let newBlockHeader: BlockHeader
    let newBlockHash: string;

    do {
      timestamp = Math.round(Date.now()/1000);
      newBlockHeader = new BlockHeader(index, prevHash, merkleRoot, timestamp, difficulty, nonce++);
      newBlockHash = this.calHashOfBlock(newBlockHeader)
    } while(!this.isValidBlockHash(newBlockHash, difficulty))

    return new Block(newBlockHash, newBlockHeader, genesisData)
	}

  static createNewBlock = (lastBlock: Block, data: string[], difficulty: number): Block => {
    const index = !!lastBlock ? lastBlock.header.index + 1 : 0
    const prevHash = !!lastBlock ? lastBlock.hash : "0".repeat(64)
    
    // Calculate merkleroot with SHA256
    const merkleRoot = this.calMerkleRoot(data)
    
    let timestamp: number
    let nonce: number = 0;
    
    let newBlockHeader: BlockHeader
    let newBlockHash: string;

    do {
      timestamp = Math.round(Date.now()/1000);
      newBlockHeader = new BlockHeader(index, prevHash, merkleRoot, timestamp, difficulty, nonce++);
      newBlockHash = this.calHashOfBlock(newBlockHeader)
    } while(!this.isValidBlockHash(newBlockHash, difficulty))

    return new Block(newBlockHash, newBlockHeader, data)
  }

  static isValidBlockHash = (hash: string, difficulty: number): boolean => { 
    return hash.startsWith("0".repeat(difficulty))
  }

	static isValidNewBlock = (lastBlock: Block | null, newBlock: Block): boolean => {
		if(!lastBlock) return true
		if(lastBlock.hash === newBlock.hash) return false 
		if(lastBlock.header.index >= newBlock.header.index) return false 
		if(lastBlock.header.prevHash === newBlock.header.prevHash) return false 
		return true
	}
}