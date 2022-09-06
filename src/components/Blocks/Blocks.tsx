import React, { useEffect, useRef } from "react";
import { Block } from "../../blockchain/block";
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
	BtnBox,
	Btn,
} from "./styled";

const Blocks: React.FC<BlockComponent.Props> = ({ peer }) => {
	const {
		blockchain,
		setBlockchain,
		handleOnChangeHeader,
		handleOnChangeBody,
	} = useCreatePeerBlocks(peer);

	return (
		<Container>
			{<h1>Peer {peer}</h1>}
			<Wrap>
				<Content>
					{/* Blocks */}
					{blockchain
						.map((block, index) => {
							const dataWrapRef: React.MutableRefObject<null | HTMLFormElement> =
								useRef(null);

							useEffect(() => {
								if (!dataWrapRef.current) return;
								if (!Block.isValidBlock(blockchain[index - 1], block))
									dataWrapRef.current.classList.add("invalid");
								else dataWrapRef.current.classList.remove("invalid");
							}, [block]);

							useEffect(() => {
								block = { ...block, hash: Block.calHashOfBlock(block.header) };
								setBlockchain((prev) => {
									const blocksCopy = [...prev];
									blocksCopy[index] = block;
									return blocksCopy;
								});
							}, [block.header]);

							useEffect(() => {
								if (!!blockchain[index - 1])
									setBlockchain((prev) => {
										let blocksCopy = [...prev];
										let blockCopy = { ...blocksCopy[index] };
										blockCopy.header = {
											...blockCopy.header,
											prevHash: blockchain[index - 1]?.hash,
										};
										blocksCopy[index] = blockCopy;
										return blocksCopy;
									});
							}, [blockchain[index - 1]?.hash]);

							const handleOnClickMine = (e: React.MouseEvent, index: number) => {
								e.preventDefault();
								setBlockchain(prev => {
									let blocksCopy = [...prev] 
									blocksCopy[index] = Block.createNewBlockWithoutTimestampChange(blocksCopy[index])
									return blocksCopy
								})
							}

							return (
								<BlockWrap key={"peer" + peer + "block" + block.header.index}>
									<Title>Block #{block.header.index}</Title>
									<DataWrap
										ref={dataWrapRef}
										className={
											Block.isValidBlock(blockchain[index - 1], block)
												? ""
												: "invalid"
										}
									>
										<Column>
											<DataBox>
												<Row>
													<Attribute>Hash</Attribute>
													<Input
														className="important-value"
														key={block.hash}
														defaultValue={block.hash}
														spellCheck={false}
														readOnly
													/>
												</Row>
											</DataBox>

											<DataBox>
												<SubTitle>Header</SubTitle>
												<Column>
													<Row>
														<Attribute>Difficulty</Attribute>
														<Input
															name="difficulty"
															defaultValue={block.header.difficulty}
															type="number"
															min={1}
															onChange={(e) => handleOnChangeHeader(e, index)}
														/>
													</Row>
													<Row>
														<Attribute>Nonce</Attribute>
														<Input
															name="nonce"
															key={block.header.nonce}
															defaultValue={block.header.nonce}
															type="number"
															min={0}
															onChange={(e) => handleOnChangeHeader(e, index)}
														/>
													</Row>
													<Row>
														<Attribute>Merkle Root</Attribute>
														<Input
															name="merkleroot"
															className="important-value"
															key={block.header.merkleRoot}
															defaultValue={block.header.merkleRoot}
															spellCheck={false}
															readOnly
															onChange={(e) => handleOnChangeHeader(e, index)}
														/>
													</Row>
													<Row>
														<Attribute>Prev Hash</Attribute>
														<Input
															name="prevhash"
															className="important-value"
															key={block.header.prevHash}
															defaultValue={block.header.prevHash}
															spellCheck={false}
															readOnly
															onChange={(e) => handleOnChangeHeader(e, index)}
														/>
													</Row>
												</Column>
											</DataBox>
											<DataBox>
												<SubTitle>Body</SubTitle>
												<Row>
													<Column>
														{block.body.map((data, bodyIndex) => (
															<Row key={"body" + bodyIndex}>
																<Attribute>From:</Attribute>{" "}
																<Input
																	name="from"
																	defaultValue={data.from}
																	spellCheck={false}
																	onChange={(e) =>
																		handleOnChangeBody(e, index, bodyIndex)
																	}
																/>
																<Attribute>To:</Attribute>{" "}
																<Input
																	name="to"
																	defaultValue={data.to}
																	spellCheck={false}
																	onChange={(e) =>
																		handleOnChangeBody(e, index, bodyIndex)
																	}
																/>
																<Attribute>$</Attribute>{" "}
																<Input
																	name="amount"
																	defaultValue={data.amount}
																	type="number"
																	onChange={(e) =>
																		handleOnChangeBody(e, index, bodyIndex)
																	}
																/>
															</Row>
														))}
													</Column>
												</Row>
											</DataBox>
											<BtnBox>
												<Btn
													onClick={e => handleOnClickMine(e, index)}
													disabled={Block.isValidBlock(
														blockchain[index - 1],
														block
													)}
												>
													Mine
												</Btn>
											</BtnBox>
										</Column>
									</DataWrap>
								</BlockWrap>
							);
						})
						}
				</Content>
			</Wrap>
		</Container>
	);
};

export default Blocks;
