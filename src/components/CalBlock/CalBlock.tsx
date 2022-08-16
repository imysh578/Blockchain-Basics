import React, { useEffect, useRef, useState } from "react";
import {
	Column,
	Btn,
	BtnBox,
	Container,
	Content,
	Input,
	Row,
	Name,
	TextArea,
	Title,
	Wrap,
	SubTitle,
	Section,
	RemoveIcon,
	AddIcon,
} from "./styled";
import { useRecoilState } from "recoil";
import DEFAULT from "./data";
import { blockchainState } from "../../states/recoil/blockchain";
import { Block, BlockHeader } from "../../blockchain/block";

const CalBlock = () => {
	const [blockchain, setBlockchain] = useRecoilState(blockchainState);
	const [headerData, setHeaderData] = useState({} as BlockHeader);
	const [bodyData, setBodyData] = useState([] as string[]);
	const difficultyRef: React.MutableRefObject<null | HTMLInputElement> =
		useRef(null);
	const nonceRef: React.MutableRefObject<null | HTMLInputElement> =
		useRef(null);
	const bodyInputRef: React.MutableRefObject<null | HTMLTextAreaElement> =
		useRef(null);
	const handleOnChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {};

	let lastBlock = blockchain[blockchain.length - 1];

	useEffect(() => {
		lastBlock = blockchain[blockchain.length - 1];
	}, [blockchain]);

	const handleOnClickAdd = () => {
		setBodyData(prev => [...prev, bodyInputRef.current!.value])
		console.log(bodyData)
	};

	const handleOnClickRemove = (index: number) => {
		setBodyData(prev => {
			const copy = [...prev]
			copy.splice(index,1)
			return copy
		})
	};

	const handleOnClickMine = () => {
		const newBlock = Block.createNewBlock(
			lastBlock,
			bodyData,
			Number(difficultyRef.current == null ? 0 : difficultyRef.current.value)
		);
		if(!newBlock) return null
		setBlockchain(prev => [...prev, newBlock]);
	};

	return (
		<Container>
			<Wrap>
				<Title>Create New Block</Title>
				<Content>
					<Section>
						<SubTitle>Header</SubTitle>
						<Row>
							<Column>
								<Name>Index</Name>
								<Input type="number" value={DEFAULT.INDEX} readOnly />
							</Column>
							<Column>
								<Name>Difficulty</Name>
								<Input
									type="number"
									defaultValue={DEFAULT.DIFFICULTY}
									min={DEFAULT.DIFFICULTY}
									ref={difficultyRef}
								/>
							</Column>
						</Row>
						<Row>
							<Column>
								<Name>Nonce</Name>
								<Input
									type="number"
									defaultValue={DEFAULT.NONCE}
									min={DEFAULT.NONCE}
									ref={nonceRef}
								/>
							</Column>
						</Row>
						<Row>
							<Column>
								<Name>Previous Hash</Name>
								<Input type="text" value={"asdfsadfasdfasdfasdf"} readOnly />
							</Column>
						</Row>
						<Row>
							<Column>
								<Name>Merkle Root</Name>
								<Input type="text" value={"asdfsadfasdfasdfasdf"} readOnly />
							</Column>
						</Row>
					</Section>
					<Section>
						<SubTitle>Body</SubTitle>
						<Row>
							<TextArea ref={bodyInputRef} />
							<AddIcon onClick={handleOnClickAdd} />
						</Row>
						{bodyData.map((data, index) => (
							<Row key={index}>
								<TextArea defaultValue={data}/>
								<RemoveIcon onClick={()=>handleOnClickRemove(index)}/>
							</Row>
						))}
					</Section>
				</Content>
				<BtnBox>
					<Btn onClick={handleOnClickMine}>Mine</Btn>
				</BtnBox>
			</Wrap>
		</Container>
	);
};

export default CalBlock;
