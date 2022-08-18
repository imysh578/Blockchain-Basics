import { atom } from "recoil";
import { Block, BlockHeader } from "../../blockchain/block";
import { KEYS } from "../keys";

const genesisBlock: Block = Block.createGenesisBlock()

export const blockchainState = atom({
	key: KEYS.BLOCKCHAIN_STATE,
	default: [] as Block[],
});
