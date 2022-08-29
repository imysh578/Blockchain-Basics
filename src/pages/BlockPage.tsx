import React from "react";
import CreateBlockForm from "../components/CreateBlockForm";
import styled from "styled-components";
import AsyncBoundary from "../components/AsyncBoundary/AsyncBoundary";
import Error from "../components/Error";
import Loading from "../components/Loading";
import CreatedBlocks from "../components/CreatedBlocks";
import { AiOutlineArrowRight } from "react-icons/ai";
import Blocks from "../components/Blocks";

const BlockPage = () => {
	return (
		<>
			<AsyncBoundary
				ErrorFallback={(arg) => <Error error={arg.error} />}
				SuspenseFallback={<Loading />}
			>
				<Row>
					<CreateBlockForm />
					<>
						<Divider/>
						<RightArrow/>
					</>
					<Blocks />
				</Row>
			</AsyncBoundary>
		</>
	);
};

const Row = styled.div`
	${({ theme }) => theme.mixins.flexBox("row", "center", "center")}
	gap: 0.5rem;
	width: 100%;
	height: 100%;
`;

const Divider = styled.div`
	position: absolute;
  left: 50%;
  top: 50%;
	transform: translate(-50%, -50%);
	width: 2px;
	height: 90%;
	background: ${({theme}) => theme.color.dark};
`;

const RightArrow = styled(AiOutlineArrowRight)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
	font-size: 2rem;
	padding: 0.25rem;
  color: ${({theme}) => theme.color.white};
  background: ${({theme}) => theme.color.dark};
  border-radius: 50%;
	z-index: ${({theme}) => theme.zIndex.upper};
`;

export default BlockPage;
