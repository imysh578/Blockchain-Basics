import React from "react";
import { useRecoilValue } from "recoil";
import { blockchainState } from "../../states/recoil/blockchain";
import {
	Attribute,
	Block,
	Column,
	Container,
	Content,
	DataBox,
	DataWrap,
	Description,
	Row,
	SubTitle,
	Title,
	Wrap,
} from "./styled";

const CreatedBlocks = () => {
	const blockchain = useRecoilValue(blockchainState);

	return (
		<Container>
			<Wrap>
				<Content>
					{/* Blocks */}
					{blockchain
						.map((block) => (
							<Block key={block.hash}>
								<Title>Block #{block.header.index}</Title>
								<DataWrap>
									<Column>
										<DataBox>
											<Row>
												<Attribute>Hash</Attribute>
												<Description className="important-value">
													{block.hash}
												</Description>
											</Row>
										</DataBox>

										<DataBox>
											<SubTitle>Header</SubTitle>
											<Column>
												<Row>
													<Attribute>Difficulty</Attribute>
													<Description>{block.header.difficulty}</Description>
												</Row>
												<Row>
													<Attribute>Nonce</Attribute>
													<Description>{block.header.nonce}</Description>
												</Row>
												<Row>
													<Attribute>timestamp</Attribute>
													<Description>
														{new Date(block.header.timestamp).toUTCString()}
													</Description>
												</Row>
												<Row>
													<Attribute>Merkle Root</Attribute>
													<Description>{block.header.merkleRoot}</Description>
												</Row>
												<Row>
													<Attribute>Prev Hash</Attribute>
													<Description className="important-value">
														{block.header.prevHash}
													</Description>
												</Row>
											</Column>
										</DataBox>
										<DataBox>
											<SubTitle>Body</SubTitle>
											<Row>
												<Column>
													{block.body.map((data, index) => (
														<Description key={(data as string) + index}>
															{data as string}
														</Description>
													))}
												</Column>
											</Row>
										</DataBox>
									</Column>
								</DataWrap>
							</Block>
						))
						}
				</Content>
			</Wrap>
		</Container>
	);
};

export default CreatedBlocks;
