import React from "react";
import CreateBlockForm from "../components/CreateBlockForm";
import styled from "styled-components";
import AsyncBoundary from "../components/AsyncBoundary/AsyncBoundary";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Blocks from "../components/Blocks";

const BlockPage = () => {
	return (
		<>
			<AsyncBoundary
				ErrorFallback={(arg) => <Error error={arg.error} />}
				SuspenseFallback={<Loading />}
			>
				<Row>
					<ContentOne>
						<CreateBlockForm />
					</ContentOne>
					<ContentTwo>
						<Blocks />
					</ContentTwo>
				</Row>
			</AsyncBoundary>
		</>
	);
};

const Row = styled.div`
	${({ theme }) => theme.mixins.flexBox("row", "center", "center")}
	width: 100%;
	height: 100%;
`;

const ContentOne = styled.div`
	width: 48rem;
`;

const ContentTwo = styled.div`
	width: calc(100% - 48rem);
`;

export default BlockPage;
