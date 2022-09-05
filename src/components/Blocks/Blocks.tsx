import React, { useEffect, useRef, useState } from "react";
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
	Btn
} from "./styled";

const Blocks: React.FC<BlockComponent.Props> = ({ peer }) => {
	const {blockchain, handleOnChangeHeader, handleOnChangeBody} = useCreatePeerBlocks(peer);

	useEffect(() => {
		console.log(blockchain)
	}, [blockchain])

	return (
		<Container>
			{<h1>Peer {peer}</h1>}
			<Wrap>
				<Content>
					{/* Blocks */}
					{blockchain
						.map((block, index) => {
							const blockHashRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null)
							const merkleRootRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null)
							const dataWrapRef: React.MutableRefObject<null | HTMLFormElement> = useRef(null)

							useEffect(() => {
								if(!dataWrapRef.current) return
								if(!Block.isValidBlock(blockchain[index-1], block))
									dataWrapRef.current.classList.add("invalid")
								else dataWrapRef.current.classList.remove("invalid")
							}, [blockchain])

							useEffect(() => {
								if(blockHashRef.current === null) return
								blockHashRef.current.value = Block.calHashOfBlock(block.header)
							}, [block.header])

							useEffect(() => {
								if(merkleRootRef.current === null) return
								merkleRootRef.current.value = Block.calMerkleRoot(block.body)
							}, [block.body])

							return (
								<BlockWrap key={block.header.index}>
									<Title>Block #{block.header.index}</Title>
									<DataWrap ref={dataWrapRef} className={Block.isValidBlock(blockchain[index-1], block) ? "" : "invalid"}>
										<Column>
											<DataBox>
												<Row>
													<Attribute>Hash</Attribute>
													<Input
														className="important-value"
														defaultValue={block.hash}
														spellCheck={false}
														ref= {blockHashRef}
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
															min={0}
															onChange={(e) => handleOnChangeHeader(e, index)}
														/>
													</Row>
													<Row>
														<Attribute>Nonce</Attribute>
														<Input
															name="nonce"
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
															defaultValue={block.header.merkleRoot}
															spellCheck={false}
															readOnly
															ref={merkleRootRef}
															onChange={(e) => handleOnChangeHeader(e, index)}
														/>
													</Row>
													<Row>
														<Attribute>Prev Hash</Attribute>
														<Input
															name="prevhash"
															className="important-value"
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
															<Row
																key={"body" + bodyIndex}
															>
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
													onClick={(e) => {
														e.preventDefault();
														console.log(block.header);
													}}
													disabled={Block.isValidBlock(blockchain[index-1], block)}
												>
													Mine
												</Btn>
											</BtnBox>
										</Column>
									</DataWrap>
								</BlockWrap>
							);})
						.reverse()}
				</Content>
			</Wrap>
		</Container>
	);
};

export default Blocks;
