import { atom } from "recoil";
import { KEYS } from "../keys";

export const bodyDataInputState = atom({
	key: KEYS.BODY_DATA_INPUT_STATE,
	default: [] as string[],
});
