import React from 'react'
import { useSetRecoilState } from 'recoil';
import { storedHashedValuesState } from '../../states/recoil/hash';
import { Container, RemoveIcon, RightArrow, Text, Wrap } from './styled'

const StoredHash: React.FC<{hasedValue: StoredHashedValue, index: number}> = ({hasedValue, index}) => {
	const setStoredHashedValues = useSetRecoilState(storedHashedValuesState);
  const handleOnClickRemove = () => {
		setStoredHashedValues((prev) => {
      const copy = [...prev]
      copy.splice(index,1)
      return copy
    });
	};

  return (
    <Container>
      <Wrap>
        <Text>{hasedValue.rawData}</Text>
        <RightArrow/>
        <Text>{hasedValue.hasedData}</Text>
        <RemoveIcon onClick={handleOnClickRemove}/>
      </Wrap>
    </Container>
  )
}

export default StoredHash