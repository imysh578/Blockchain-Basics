import React from "react";
import { Block } from "../../blockchain/block";
import { Tx } from "../../blockchain/transaction";
import { useCreatePeerBlocks } from "../../hooks/useCreatePeerBlocks";

import {
	Attribute,
	BlockWrap,
	Column,
	Container,
	Content,
	DataBox,
	DataWrap,
	Input,
	Row,
	SubTitle,
	Title,
	Wrap,
} from "./styled";

const Blocks: React.FC<BlockComponent.Props> = ({ peer }) => {
	const [blockchain, setBlockchain] = useCreatePeerBlocks(peer);

	const handleOnChangeHeader = (e: React.FormEvent<HTMLDivElement>, index: number) => {
		setBlockchain(prev => {
			let blocksCopy = [...prev]
			let blockCopy = {...prev[index]}
			blockCopy = {...blockCopy, [e.target.name]: e.target.value}
			blocksCopy[index] = blockCopy
			return blocksCopy
		})
	}

	const handleOnChangeBody = (e: React.FormEvent<HTMLDivElement>, index: number, bodyIndex: number) => {
		setBlockchain(prev => {
			let blocksCopy = [...prev]
			let blockCopy = {...prev[index]}
			let bodyCopy = {...prev[index]}.body
			
			bodyCopy = []
			blockCopy.body = bodyCopy
			blocksCopy[index] = blockCopy
			console.log(prev[index])
			return blocksCopy
		})
	}

	return (
		<Container>
			{!!peer && <h1>Peer {peer}</h1>}
			<Wrap>
				<Content>
					{/* Blocks */}
					{blockchain
						.map((block, index) => (
							<BlockWrap key={block.hash}>
								<Title>Block #{block.header.index}</Title>
								<DataWrap>
									<Column>
										<DataBox>
											<Row>
												<Attribute>Hash</Attribute>
												<Input className="important-value" defaultValue={block.hash} spellCheck={false} readOnly/>
											</Row>
										</DataBox>

										<DataBox onChange={e => handleOnChangeHeader(e, index)}>
											<SubTitle>Header</SubTitle>
											<Column>
												<Row>
													<Attribute>Difficulty</Attribute>
													<Input name="difficulty" defaultValue={block.header.difficulty} type="number" />
												</Row>
												<Row>
													<Attribute>Nonce</Attribute>
													<Input name="nonce" defaultValue={block.header.nonce} type="number" />
												</Row>
												<Row>
													<Attribute>Merkle Root</Attribute>
													<Input name="merkleroot" defaultValue={block.header.merkleRoot} spellCheck={false} />
												</Row>
												<Row>
													<Attribute>Prev Hash</Attribute>
													<Input name="prevhash" className="important-value" defaultValue={block.header.prevHash} spellCheck={false} />
												</Row>
											</Column>
										</DataBox>
										<DataBox>
											<SubTitle>Body</SubTitle>
											<Row>
												<Column>
													{block.body.map(
														(data, bodyIndex) =>
															!(typeof data === "string") && (
																<Row
																	key={
																		data.from + data.to + data.amount + index
																	}
																	onChange={e => handleOnChangeBody(e, index, bodyIndex)}
																>
																	<Attribute>From:</Attribute> <Input defaultValue={data.from} spellCheck={false}/>
																	<Attribute>To:</Attribute> <Input defaultValue={data.to} spellCheck={false}/>
																	<Attribute>$</Attribute> <Input defaultValue={data.amount} type="number"/>
																</Row>
															)
													)}
												</Column>
											</Row>
										</DataBox>
									</Column>
								</DataWrap>
							</BlockWrap>
						))
						.reverse()}
				</Content>
			</Wrap>
		</Container>
	);
};

export default Blocks;
