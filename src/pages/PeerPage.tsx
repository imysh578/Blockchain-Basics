import React from 'react'
import styled from 'styled-components'
import AsyncBoundary from '../components/AsyncBoundary/AsyncBoundary'
import Blocks from '../components/Blocks'
import Error from '../components/Error'
import Loading from '../components/Loading'

const PeerPage = () => {
  return (
    <>
      <AsyncBoundary
				ErrorFallback={(arg) => <Error error={arg.error} />}
				SuspenseFallback={<Loading />}
			>
        <Column>
          <Blocks peer={1} />
          <Blocks peer={2} />
          <Blocks peer={3} />
        </Column>
			</AsyncBoundary>
    </>
  )
}

const Column = styled.div`
	${({ theme }) => theme.mixins.flexBox("column", "center", "center")}
	gap: 0.5rem;
	width: 100%;
	height: 100%;
`;

export default PeerPage