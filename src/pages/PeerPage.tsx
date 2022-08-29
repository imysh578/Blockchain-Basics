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
        <Blocks />
        <Blocks peer={1} />
        <Blocks peer={2} />
        <Blocks peer={3} />
			</AsyncBoundary>
    </>
  )
}

export default PeerPage