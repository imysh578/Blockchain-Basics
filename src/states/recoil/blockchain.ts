import { atom } from "recoil";
import { Block, BlockHeader } from "../../blockchain/block";
import { KEYS } from "../keys";

export const blockchainState = atom({
	key: KEYS.BLOCKCHAIN_STATE,
	default: [] as Block[],
});
