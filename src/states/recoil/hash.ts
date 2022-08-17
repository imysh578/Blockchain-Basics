import { atom } from "recoil";
import { KEYS } from "../keys";

export const storedHashedValuesState = atom({
	key: KEYS.STORED_HASHED_VALUES_STATE,
	default: [] as StoredHashedValue[],
});
