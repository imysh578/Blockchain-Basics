import React, { useState } from "react";
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

const CalHash = () => {
	const [rawData, setRawData] = useState("");
	const [hashedValue, setHashedValue] = useState(sha256("").toString());
	const setStoredHashedValues = useSetRecoilState(storedHashedValuesState);

	const handleOnChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const calSHA256 = sha256(e.target.value).toString();
		setRawData(e.target.value);
		setHashedValue(calSHA256);
	};

	const handleOnClickStore = () => {
		setStoredHashedValues((prev) => [
			...prev,
			{ rawData: rawData, hasedData: hashedValue },
		]);
	};

	return (
		<Container>
			<Wrap>
				<Title>SHA256 Hash Test</Title>
				<Content>
					<Box>
						<Name>Raw Data</Name>
						<TextArea onChange={handleOnChangeInput} />
					</Box>
					<Box>
						<Name>Hashed Data</Name>
						<Result>{hashedValue}</Result>
					</Box>
				</Content>
				<BtnBox>
					<Btn onClick={handleOnClickStore}>Store</Btn>
				</BtnBox>
			</Wrap>
		</Container>
	);
};

export default CalHash;
