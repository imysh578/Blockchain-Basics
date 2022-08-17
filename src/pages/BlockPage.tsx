import React from "react";
import CalBlock from "../components/CalBlock";
import styled from "styled-components";
import AsyncBoundary from "../components/AsyncBoundary/AsyncBoundary";
import Error from "../components/Error";
import Loading from "../components/Loading";

const BlockPage = () => {
	return (
		<>
			<AsyncBoundary
				ErrorFallback={(arg) => <Error error={arg.error} />}
				SuspenseFallback={<Loading />}
			>
				<Row>
					<CalBlock />
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

export default BlockPage;
