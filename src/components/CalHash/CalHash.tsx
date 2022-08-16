import React, { useRef, useState } from "react";
import {
	Container,
	Wrap,
	Result,
	TextArea,
	Title,
	Content,
	Name,
	Box,
	Btn,
	BtnBox,
} from "./styled";
import sha256 from "crypto-js/sha256";
import { useSetRecoilState } from "recoil";
import { storedHashedValuesState } from "../../states/recoil/hash";
const DEFAULT_HASHED_VALUE = sha256("").toString()

const CalHash = () => {
	const [rawData, setRawData] = useState("");
	const [hashedValue, setHashedValue] = useState(DEFAULT_HASHED_VALUE);
	const setStoredHashedValues = useSetRecoilState(storedHashedValuesState);
	const textAreaRef: React.MutableRefObject<null | HTMLTextAreaElement> = useRef(null);

	const handleOnChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const calSHA256 = sha256(e.target.value).toString();
		setRawData(e.target.value);
		setHashedValue(calSHA256);
	};

	const handleOnClickCompare = () => {
		if(!!rawData) {
			setStoredHashedValues((prev) => [
				...prev,
				{ rawData: rawData, hasedData: hashedValue },
			]);
			textAreaRef.current!.value = ""
			setRawData("")
			setHashedValue(DEFAULT_HASHED_VALUE)
		} else alert("Empty raw data. Please input data and try again.")
	};

	const handleOnPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if(!e.shiftKey && e.key === "Enter") {
			handleOnClickCompare()
		}
	}

	return (
		<Container>
			<Wrap>
				<Title>SHA256 Hash Test</Title>
				<Content>
					<Box>
						<Name>Raw Data</Name>
						<TextArea ref={textAreaRef} onChange={handleOnChangeInput} />
					</Box>
					<Box>
						<Name>Hashed Data</Name>
						<Result>{hashedValue}</Result>
					</Box>
				</Content>
				<BtnBox>
					<Btn onClick={handleOnClickCompare}>Compare</Btn>
				</BtnBox>
			</Wrap>
		</Container>
	);
};

export default CalHash;
