import React from 'react'

const TestPage = () => {
  const [num, setNum] = React.useState(0)

  const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds))

  const handleOnClick1 = async () => {
    setNum(num+1)
    // setNum(prev => prev+1)
  }
  const handleOnClick2 = async () => {
    await delay(5000)
    setNum(num-1)
    // setNum(prev => prev-1)
  }

  return (
    <>
      <h1>{num}</h1>
      <button onClick={handleOnClick1}>button1</button>
      <button onClick={handleOnClick2}>button2</button>
    </>
  )
}

export default TestPage