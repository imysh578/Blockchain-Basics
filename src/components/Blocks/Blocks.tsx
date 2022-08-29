import React from "react";
import { Tx } from "../../blockchain/transaction";
import { useCreatePeerBlocks } from "../../hooks/useCreatePeerBlocks";

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

const Blocks: React.FC<BlockComponent.Props> = ({ peer }) => {
	const blockchain = useCreatePeerBlocks(peer);

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
													{block.body.map((data, index) => {
														if (typeof data === "string")
															return (
																<Description key={data + index}>
																	{data}
																</Description>
															);
														else if (data instanceof Tx)
															return (
																<div
																	key={
																		data.from + data.to + data.amount + index
																	}
																>
																	<Description>{data.from}</Description>
																	<Description>{data.to}</Description>
																	<Description>{data.amount}</Description>
																</div>
															);
													})}
												</Column>
											</Row>
										</DataBox>
									</Column>
								</DataWrap>
							</Block>
						))
						.reverse()}
				</Content>
			</Wrap>
		</Container>
	);
};

export default Blocks;
