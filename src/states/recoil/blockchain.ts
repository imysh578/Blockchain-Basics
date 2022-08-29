import { atom } from "recoil";
import { Block } from "../../blockchain/block";
import { KEYS } from "../keys";

export const blockchainState = atom({
	key: KEYS.BLOCKCHAIN_STATE,
	default: [] as Block[],
});

export const peerOneBlockchainState = atom({
	key: KEYS.PEER_ONE_BLOCKCHAIN_STATE,
	default: [] as Block[],
});

export const peerTwoBlockchainState = atom({
	key: KEYS.PEER_TWO_BLOCKCHAIN_STATE,
	default: [] as Block[],
});

export const peerThreeBlockchainState = atom({
	key: KEYS.PEER_THREE_BLOCKCHAIN_STATE,
	default: [] as Block[],
});