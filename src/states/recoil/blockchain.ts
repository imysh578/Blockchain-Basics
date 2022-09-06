import { atom } from "recoil";
import { Block, BlockHeader } from "../../blockchain/block";
import { Tx } from "../../blockchain/transaction";
import { KEYS } from "../keys";
import { blockData } from "./data";


export const blockchainState = atom({
	key: KEYS.BLOCKCHAIN_STATE,
	default: [] as Block<string>[],
});

export const peerOneBlockchainState = atom({
	key: KEYS.PEER_ONE_BLOCKCHAIN_STATE,
	default: blockData as Block<Tx>[],
});

export const peerTwoBlockchainState = atom({
	key: KEYS.PEER_TWO_BLOCKCHAIN_STATE,
	default: blockData as Block<Tx>[],
});

export const peerThreeBlockchainState = atom({
	key: KEYS.PEER_THREE_BLOCKCHAIN_STATE,
	default: blockData as Block<Tx>[],
});