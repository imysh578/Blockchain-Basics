import sha256 from "crypto-js/sha256";
import { MerkleTree } from "merkletreejs"

/**
 * Block Header structure
 */
class BlockHeader {
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
export default class Block {
	public hash: string;
	public header: BlockHeader;
	public body: string[];

	constructor(hash: string, header: BlockHeader, body: string[]) {
		this.hash = hash;
		this.header = header;
		this.body = body;
	}

	static calHashOfBlock = (blockHeader: BlockHeader): string | null => {
		const isBlockHeaderType = blockHeader instanceof BlockHeader;

    // Wrong type => return null
		if (!isBlockHeaderType) {
      console.log("Please check block header's type.")
      return null
    };

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

  static mineNewBlock = (lastBlock: Block, data: string[], difficulty: number): Block | null => {
    
    const index = lastBlock.header.index + 1
    const prevHash = lastBlock.hash
    
    // Calculate merkleroot with SHA256
    const leaves = data.map((str) => sha256(str))
    const merkleTree = new MerkleTree(leaves, sha256)
    const merkleRoot = merkleTree.getRoot().toString('hex')
    
    let timestamp: number
    let nonce: number = 0;
    
    let newBlockHeader: BlockHeader
    let newBlockHash: string;

    do {
      timestamp = Math.round(Date.now()/1000);
      newBlockHeader = new BlockHeader(index, prevHash, merkleRoot, timestamp, difficulty, nonce++);
      newBlockHash = this.calHashOfBlock(newBlockHeader)!
    } while(!this.isValidBlockHash(newBlockHash, difficulty))

    return new Block(newBlockHeader, newBlockHash, data)
  }

  static isValidBlockHash = (hash: string, difficulty: number): boolean => { 
    return hash.startsWith("0".repeat(difficulty))
  }
}
