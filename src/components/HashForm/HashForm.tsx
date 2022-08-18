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

const HashForm = () => {
	const [hashedValue, setHashedValue] = useState(DEFAULT_HASHED_VALUE);
	const setStoredHashedValues = useSetRecoilState(storedHashedValuesState);
	const resetStoredHashedValues = useResetRecoilState(storedHashedValuesState);
	const textAreaRef: React.MutableRefObject<null | HTMLTextAreaElement> =
		useRef(null);

	const handleOnChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const calSHA256 = sha256(e.target.value).toString();
		setHashedValue(calSHA256);
	};

	const handleOnClickCompare = () => {
		const inputData = textAreaRef.current!.value
		if (!inputData) {
			alert("Empty raw data. Please input data and try again.");
			return;
		}

		setStoredHashedValues((prev) => [
			...prev,
			{ rawData: inputData, hasedData: hashedValue },
		]);
		textAreaRef.current!.value = textAreaRef.current!.defaultValue;
		setHashedValue(DEFAULT_HASHED_VALUE);
	};

	const handleOnClickClear = () => {
		resetStoredHashedValues();
		textAreaRef.current!.value = textAreaRef.current!.defaultValue;
	};

	const handleOnPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		// Enter : Add component
		// Enter + Shift : New line
		// Enter + Ctrl : Clear

		if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
			e.preventDefault();
			handleOnClickCompare();
		}

		if (e.key === "Enter" && !e.shiftKey && e.ctrlKey) {
			e.preventDefault();
			handleOnClickClear();
		}
	};

	return (
		<Container>
			<Wrap>
				<Title>SHA256 Hash Test</Title>
				<Content>
					<Box>
						<Name>Raw Data</Name>
						<Description>Add to compare : [Enter]</Description>
						<Description>New line : [Shift + Enter]</Description>
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
					<Btn type="reset" onClick={handleOnClickClear}>
						Clear
					</Btn>
					<Btn onClick={handleOnClickCompare}>Compare</Btn>
				</BtnBox>
			</Wrap>
		</Container>
	);
};

export default HashForm;
