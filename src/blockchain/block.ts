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
export class Block {
	public hash: string;
	public header: BlockHeader;
	public body: string[] | Tx[];

	constructor(hash: string, header: BlockHeader, body: string[] | Tx[]) {
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
			if(data instanceof Tx) sha256(data.from + data.to + data.amount)
			else sha256(data)
		})
    const merkleTree = new MerkleTree(leaves, sha256)
    const merkleRoot = merkleTree.getRoot().toString('hex')
		return merkleRoot
	}

  static isValidBlockHash = (hash: string, difficulty: number): boolean => {
		let leadingZeros = 0;

		for (let i = 0; i < hash.length; i++) {
			if(hash[i] !== "0") break;
			leadingZeros++;
		}
    return leadingZeros >= difficulty
    // return hash.startsWith("0".repeat(difficulty))
  }

	static isValidNewBlock = (lastBlock: Block | null, newBlock: Block): boolean => {
		if(!lastBlock) return true
		if(lastBlock.hash === newBlock.hash) return false 
		if(lastBlock.header.index >= newBlock.header.index) return false 
		if(lastBlock.header.prevHash === newBlock.header.prevHash) return false 
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
				nonce
			);
			newBlockHash = Block.calHashOfBlock(newBlockHeader);
		} while (!Block.isValidBlockHash(newBlockHash, difficulty));

		const newBlock = new Block(newBlockHash, newBlockHeader, bodyData);
	}
}