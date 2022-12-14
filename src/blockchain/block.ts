import sha256 from "crypto-js/sha256.js";
import { MerkleTree } from "merkletreejs"
import { Tx } from "./transaction";

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
export class Block<T> {
	public hash: string;
	public header: BlockHeader;
	public body: T[];

	constructor(hash: string, header: BlockHeader, body: T[]) {
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

	static calMerkleRoot = (dataArr: string[] | Tx[]) => {
		// Calculate merkleroot with SHA256
		const leaves = dataArr.map(data => {
			if(typeof data === "string") return sha256(data)
			else return sha256(data.from + data.to + data.amount)
		})
    const merkleTree = new MerkleTree(leaves, sha256)
    const merkleRoot = merkleTree.getRoot().toString('hex')
		return merkleRoot
	}

  static findValidBlockHash = (hash: string, difficulty: number): boolean => {
		let leadingZeros = 0;

		for (let i = 0; i < hash.length; i++) {
			if(hash[i] !== "0") break;
			leadingZeros++;
		}
    return leadingZeros >= difficulty
    // return hash.startsWith("0".repeat(difficulty))
  }

	static isValidBlockHash = (block: Block<any>) => {
		if(!this.findValidBlockHash(block.hash, block.header.difficulty)) return false
		if(this.calHashOfBlock(block.header) !== block.hash) return false
		return true
	}

	static isValidBlock = (prevBlock: Block<any> | undefined, currentBlock: Block<any>): boolean => {
		if(!this.isValidBlockHash(currentBlock)) return false
		if(!prevBlock) return true
		if(prevBlock.hash === currentBlock.hash) return false 
		if(prevBlock.header.index >= currentBlock.header.index) return false 
		if(prevBlock.hash !== currentBlock.header.prevHash) return false 
		return true
	}

	static isValidNewBlock = (lastBlock: Block<any> | null | undefined, newBlock: Block<any>): boolean => {
		if(!this.isValidBlockHash(newBlock)) return false
		if(!lastBlock) return true
		if(lastBlock.hash === newBlock.hash) return false 
		if(lastBlock.header.index >= newBlock.header.index) return false 
		if(lastBlock.hash !== newBlock.header.prevHash) return false 
		return true
	}

	static createNewBlock = (header: BlockHeader, bodyData: Tx[]) => {
		const index = header.index;
		const prevHash = header.prevHash;
		const difficulty = header.difficulty;

		// Calculate merkleroot with SHA256
		const merkleRoot = Block.calMerkleRoot(bodyData);

		let timestamp: number;
		let nonce: number = header.nonce;

		let newBlockHeader: BlockHeader;
		let newBlockHash: string;

		do {
			timestamp = Date.now();
			newBlockHeader = new BlockHeader(
				index,
				prevHash,
				merkleRoot,
				timestamp,
				difficulty,
				nonce++
			);
			newBlockHash = Block.calHashOfBlock(newBlockHeader);
		} while (!Block.findValidBlockHash(newBlockHash, difficulty));

		const newBlock = new Block(newBlockHash, newBlockHeader, bodyData);
		return newBlock
	}

	static addNewBlock = (newBlock: Block<any>, blocks: Block<any>[]): boolean => {
		if(!this.isValidNewBlock(blocks[blocks.length-1], newBlock)) return false
		
		blocks.push(newBlock)
		return true;
	}

	static createNewBlockWithoutTimestampChange = (block: Block<Tx>) => {
		const index = block.header.index;
		const prevHash = block.header.prevHash;
		const difficulty = block.header.difficulty;
		const merkleRoot = block.header.merkleRoot
		const timestamp: number = block.header.timestamp;
		let nonce: number = 0;

		let newBlockHeader: BlockHeader;
		let newBlockHash: string;

		do {
			newBlockHeader = new BlockHeader(
				index,
				prevHash,
				merkleRoot,
				timestamp,
				difficulty,
				nonce++
			);
			newBlockHash = Block.calHashOfBlock(newBlockHeader);
		} while (!Block.findValidBlockHash(newBlockHash, difficulty));

		const newBlock = new Block(newBlockHash, newBlockHeader, block.body);
		return newBlock
	}
}