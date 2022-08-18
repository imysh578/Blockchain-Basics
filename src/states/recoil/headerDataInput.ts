import { atom } from "recoil";
import { BlockHeader } from "../../blockchain/block";
import { KEYS } from "../keys";

const defaultValue: BlockHeader = {
	index: 0,
	prevHash: "0".repeat(64),
	merkleRoot: "",
	timestamp: Math.round(Date.now()/1000),
	difficulty: 1,
	nonce: 0,
}

export const headerDataInputState = atom({
	key: KEYS.HEADER_DATA_INPUT_STATE,
	default: defaultValue
});
