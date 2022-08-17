import React from 'react'
import AsyncBoundary from '../components/AsyncBoundary/AsyncBoundary'
import Error from '../components/Error'
import Loading from '../components/Loading'

const SamplePage = () => {
  return (
    <>
      <AsyncBoundary
				ErrorFallback={(arg) => <Error error={arg.error} />}
				SuspenseFallback={<Loading />}
			>
        {/* children components */}
			</AsyncBoundary>
    </>
  )
}

export default SamplePage