import React, { useEffect, useRef, useState } from "react";
import {
	Column,
	Btn,
	BtnBox,
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
} from "./styled";
import { useRecoilState, useResetRecoilState } from "recoil";
import DEFAULT from "./data";
import { blockchainState } from "../../states/recoil/blockchain";
import { Block, BlockHeader } from "../../blockchain/block";
import { bodyDataInputState } from "../../states/recoil/bodyDataInput";
import { headerDataInputState } from "../../states/recoil/headerDataInput";
import { delay } from "../../utils";

const CreateBlockForm = () => {
	const [newBlock, setNewBlock] = useState<null | Block>(null);
	const [loading, setLoading] = useState(false);

	const [blockchain, setBlockchain] = useRecoilState(blockchainState);
	const [headerData, setHeaderData] = useRecoilState(headerDataInputState);
	const [bodyData, setBodyData] = useRecoilState(bodyDataInputState);
	const resetHeaderData = useResetRecoilState(headerDataInputState);
	const resetBodyData = useResetRecoilState(bodyDataInputState);

	// Refs
	const difficultyRef: React.MutableRefObject<null | HTMLInputElement> =
		useRef(null);
	const nonceRef: React.MutableRefObject<null | HTMLInputElement> =
		useRef(null);
	const bodyInputRef: React.MutableRefObject<null | HTMLTextAreaElement> =
		useRef(null);

	let lastBlock = blockchain[blockchain.length - 1];

	useEffect(() => {
		lastBlock = blockchain[blockchain.length - 1];
		console.log(headerData);
		console.log(blockchain);
	}, [blockchain]);

	useEffect(() => {
		const result = Block.calMerkleRoot(bodyData);
		setHeaderData((prev) => ({ ...prev, merkleRoot: result }));
	}, [bodyData]);

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
		if(e.target.name === "difficulty") setHeaderData((prev) => ({ ...prev, nonce: 0 }));
	};

	const handleOnClickCreateNewBlock = async (e: React.MouseEvent) => {
		e.preventDefault();
		if(!checkRequiredInputs()) return;
		setLoading(true)
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
			timestamp = Math.round(Date.now() / 1000);
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
			await delay(1)
		} while (!Block.isValidBlockHash(newBlockHash, difficulty));
		const newBlock = new Block(newBlockHash, newBlockHeader, bodyData);
		setNewBlock(newBlock)
		setLoading(false)
	};

	const handleOnClickMine = (e: React.MouseEvent) => {
		if(!newBlock) return;
		if(!Block.isValidNewBlock(lastBlock, newBlock)) {
			alert("Must create block first!")
			return;
		}
		setBlockchain((prev) => [...prev, newBlock]);
		resetBodyData();
		resetHeaderData();
		setHeaderData((prev) => ({
			...prev,
			index: newBlock.header.index + 1,
			prevHash: newBlock.hash,
			difficulty: newBlock.header.difficulty,
		}));
		setNewBlock(null)
	};

	const checkRequiredInputs = () => {
		let inputForm: HTMLFormElement | null = document.querySelector(
			"#create-new-block-form"
		);

		// Check if required fields are filled out
		if (!inputForm!.checkValidity()) {
			inputForm!.reportValidity();
			return false;
		}

		return true
	};

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
									ref={difficultyRef}
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
									ref={nonceRef}
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
					<Btn disabled={!newBlock || loading} onClick={handleOnClickMine}>Mine</Btn>
				</Row>
			</Wrap>
		</Container>
	);
};

export default CreateBlockForm;
