import React, { useEffect, useRef, useState } from "react";
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
	Description,
} from "./styled";
import sha256 from "crypto-js/sha256";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { storedHashedValuesState } from "../../states/recoil/hash";
const DEFAULT_HASHED_VALUE = sha256("").toString();

const CalHash = () => {
	const [rawData, setRawData] = useState("");
	const [hashedValue, setHashedValue] = useState(DEFAULT_HASHED_VALUE);
	const setStoredHashedValues = useSetRecoilState(storedHashedValuesState);
	const resetStoredHashedValues = useResetRecoilState(storedHashedValuesState);
	const textAreaRef: React.MutableRefObject<null | HTMLTextAreaElement> =
		useRef(null);

	const handleOnChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const calSHA256 = sha256(e.target.value).toString();
		setRawData(e.target.value);
		setHashedValue(calSHA256);
	};

	const handleOnClickCompare = () => {
		if (!rawData) {
			alert("Empty raw data. Please input data and try again.");
			return;
		}

		setStoredHashedValues((prev) => [
			...prev,
			{ rawData: rawData, hasedData: hashedValue },
		]);
		textAreaRef.current!.value = textAreaRef.current!.defaultValue;
		setRawData("");
		setHashedValue(DEFAULT_HASHED_VALUE);
	};

	const handleOnClickReset = () => {
		resetStoredHashedValues();
	};

	const handleOnPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if(e.shiftKey) {
				textAreaRef.current!.value += '\n'
			} else if(e.ctrlKey) {
				resetStoredHashedValues()
			} else {
				handleOnClickCompare();
			}
		}
	};

	return (
		<Container>
			<Wrap>
				<Title>SHA256 Hash Test</Title>
				<Content>
					<Box>
						<Name>Raw Data</Name>
						<Description>New line : [Shift + Enter]</Description>
						<Description>Reset : [Ctrl + Enter]</Description>
						<TextArea
							ref={textAreaRef}
							onChange={handleOnChangeInput}
							onKeyDown={handleOnPressEnter}
						/>
					</Box>
					<Box>
						<Name>Hashed Data</Name>
						<Result>{hashedValue}</Result>
					</Box>
				</Content>
				<BtnBox>
					<Btn type="reset" onClick={handleOnClickReset}>
						Reset
					</Btn>
					<Btn onClick={handleOnClickCompare}>Compare</Btn>
				</BtnBox>
			</Wrap>
		</Container>
	);
};

export default CalHash;
