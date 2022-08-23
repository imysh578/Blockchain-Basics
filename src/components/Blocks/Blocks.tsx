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

const Blocks = () => {
	const blockchain = useRecoilValue(blockchainState);

	return (
		<Container>
			<Wrap>
				<Content>
					{/* Blocks */}
					{blockchain
						.map((block) => (
							<>
								<Block>
									<Title>Block #{block.header.index}</Title>
									<DataWrap>
										<Column>
                      <DataBox>
                        <Row>
                          <Attribute>Hash</Attribute>
                          <Description className="important-value">{block.hash}</Description>
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
                            <Attribute>Merkle Root</Attribute>
                            <Description>{block.header.merkleRoot}</Description>
                          </Row>
                          <Row>
                            <Attribute>Prev Hash</Attribute>
                            <Description className="important-value">{block.header.prevHash}</Description>
                          </Row>
                        </Column>
                      </DataBox>
                      <DataBox>
                        <SubTitle>Body</SubTitle>
                        <Row>
                          <Column>
                            {!block.body.length && <Description>Empty</Description>}
                            {block.body.map((data) => <Description>{data}</Description>)}
                          </Column>
                        </Row>
                      </DataBox>
										</Column>
									</DataWrap>
								</Block>
							</>
						))
						.reverse()}
				</Content>
			</Wrap>
		</Container>
	);
};

export default Blocks;
