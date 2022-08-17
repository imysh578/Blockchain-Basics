import { atom } from "recoil";
import { Block } from "../../blockchain/block";
import { KEYS } from "../keys";

export const blockchainState = atom({
	key: KEYS.BLOCKCHAIN_STATE,
	default: [] as Block[],
});
