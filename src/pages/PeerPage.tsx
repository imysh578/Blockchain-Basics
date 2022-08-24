import React from 'react'
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
        <Blocks peer={1} />
			</AsyncBoundary>
    </>
  )
}

export default PeerPage