import React, { useEffect, useRef, useState } from "react";
import {
	Column,
	Btn,
	Container,
	Form,
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
	Divider,
	RightArrow,
} from "./styled";
import { useRecoilState, useResetRecoilState } from "recoil";
import DEFAULT from "./data";
import { blockchainState } from "../../states/recoil/blockchain";
import { Block, BlockHeader } from "../../blockchain/block";
import { bodyDataInputState } from "../../states/recoil/bodyDataInput";
import { headerDataInputState } from "../../states/recoil/headerDataInput";
import { delay } from "../../utils";

const CreateBlockForm = () => {
	// useStates
	const [newBlock, setNewBlock] = useState<null | Block<string>>(null);
	const [lastBlock, setLastBlock] = useState<null | Block<string>>(null);

	// Recoils
	const [blockchain, setBlockchain] = useRecoilState(blockchainState);
	const [headerData, setHeaderData] = useRecoilState(headerDataInputState);
	const [bodyData, setBodyData] = useRecoilState(bodyDataInputState);
	const resetHeaderData = useResetRecoilState(headerDataInputState);
	const resetBodyData = useResetRecoilState(bodyDataInputState);

	// Refs
	const bodyInputRef: React.MutableRefObject<null | HTMLTextAreaElement> =
		useRef(null);

	// useEffects
	useEffect(() => {
		setLastBlock(blockchain[blockchain.length - 1] || null);
	}, []);

	useEffect(() => {
		const result = Block.calMerkleRoot(bodyData);
		setHeaderData((prev) => ({ ...prev, merkleRoot: result }));
	}, [bodyData]);

	// functions for handling events
	const handleOnClickAdd = () => {
		if (!bodyInputRef.current?.value) {
			alert("Empty raw data. Please input data and try again.");
			return;
		}
		setBodyData((prev) => [...prev, bodyInputRef.current!.value]);
		bodyInputRef.current!.value = "";
	};

	const handleOnPressEnterBodyData = (
		e: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		// Enter : Add component
		// Enter + Shift : New line
		// Enter + Ctrl : Clear

		if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
			e.preventDefault();
			handleOnClickAdd();
		}

		if (e.key === "Enter" && !e.shiftKey && e.ctrlKey) {
			e.preventDefault();
			resetBodyData();
			bodyInputRef.current!.value = bodyInputRef.current!.defaultValue;
		}
	};

	const handleOnClickRemove = (index: number) => {
		setBodyData((prev) => {
			const copy = [...prev];
			copy.splice(index, 1);
			return copy;
		});
	};

	const handleOnChangeHeaderDataInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setHeaderData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		if (e.target.name === "difficulty")
			setHeaderData((prev) => ({ ...prev, nonce: 0 }));
	};

	const handleOnClickCreateNewBlock = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (!checkRequiredInputs()) return;
		const index = headerData.index;
		const prevHash = headerData.prevHash;
		const difficulty = headerData.difficulty;

		// Calculate merkleroot with SHA256
		const merkleRoot = Block.calMerkleRoot(bodyData);

		let timestamp: number;
		let nonce: number = headerData.nonce;

		let newBlockHeader: BlockHeader;
		let newBlockHash: string;

		do {
			timestamp = Date.now();
			newBlockHeader = new BlockHeader(
				index,
				prevHash,
				merkleRoot,
				timestamp,
				difficulty,
				nonce
			);
			setHeaderData((prev) => ({ ...prev, nonce: nonce++, timestamp }));
			newBlockHash = Block.calHashOfBlock(newBlockHeader);
			await delay(1);
		} while (!Block.findValidBlockHash(newBlockHash, difficulty));
		const newBlock = new Block(newBlockHash, newBlockHeader, bodyData);
		setNewBlock(newBlock);
	};

	const handleOnClickMine = () => {
		if (!newBlock) return;
		if (!Block.isValidNewBlock(lastBlock, newBlock)) {
			alert("Must create block first!");
			return;
		}
		setBlockchain((prev) => [...prev, newBlock]);
		resetBodyData();
		resetHeaderData();
		bodyInputRef.current!.value = bodyInputRef.current!.defaultValue;
		setHeaderData((prev) => ({
			...prev,
			index: newBlock.header.index + 1,
			prevHash: newBlock.hash,
			difficulty: newBlock.header.difficulty,
		}));
		setNewBlock(null);
	};

	// Other functions
	const checkRequiredInputs = () => {
		let inputForm: HTMLFormElement | null = document.querySelector(
			"#create-new-block-form"
		);

		// Check if required fields are filled out
		if (!inputForm!.checkValidity()) {
			inputForm!.reportValidity();
			return false;
		}

		return true;
	};

	const isReadyToMine = () =>
		!!newBlock &&
		
		Block.findValidBlockHash(
			Block.calHashOfBlock(headerData),
			headerData.difficulty
		);

	return (
		<Container>
			<Wrap>
				<Title>Create New Block</Title>
				<Form id="create-new-block-form">
					<Section>
						<SubTitle>Header</SubTitle>
						<Divider />
						<Row>
							<Column>
								<Name>Index</Name>
								<Input
									type="number"
									name="index"
									value={headerData.index}
									readOnly
								/>
							</Column>
							<Column>
								<Name className="required">Difficulty</Name>
								<Input
									type="number"
									name="difficulty"
									defaultValue={headerData.difficulty}
									min={DEFAULT.DIFFICULTY}
									required
									onChange={handleOnChangeHeaderDataInput}
								/>
							</Column>
						</Row>
						<Row>
							<Column>
								<Name className="required">Nonce</Name>
								<Input
									type="number"
									name="nonce"
									value={headerData.nonce}
									min={DEFAULT.NONCE}
									required
									onChange={handleOnChangeHeaderDataInput}
								/>
							</Column>
						</Row>
						<Row>
							<Column>
								<Name>Previous Hash</Name>
								<Input
									type="text"
									value={!!lastBlock ? lastBlock.hash : headerData.prevHash}
									readOnly
								/>
							</Column>
						</Row>
						<Row>
							<Column>
								<Name>Merkle Root</Name>
								<Input type="text" value={headerData.merkleRoot} readOnly />
							</Column>
						</Row>
					</Section>
					<Section>
						<SubTitle>Body</SubTitle>
						<Divider />
						<Row>
							<TextArea
								ref={bodyInputRef}
								onKeyDown={handleOnPressEnterBodyData}
							/>
							<AddIcon onClick={handleOnClickAdd} />
						</Row>
						{bodyData
							.map((data, index) => (
								<Row key={data + index}>
									<TextArea defaultValue={data} readOnly />
									<RemoveIcon onClick={() => handleOnClickRemove(index)} />
								</Row>
							))
							.reverse()}
					</Section>
				</Form>
				<Row>
					<Row>
						<SubTitle>Hash</SubTitle>
						<Input
							type="text"
							value={Block.calHashOfBlock(headerData)}
							readOnly
						/>
					</Row>
					<Btn onClick={handleOnClickCreateNewBlock}>Create</Btn>
					<Btn disabled={!isReadyToMine()} onClick={handleOnClickMine}>
						Mine
					</Btn>
				</Row>
			</Wrap>
			<RightArrow/>
		</Container>
	);
};

export default CreateBlockForm;
