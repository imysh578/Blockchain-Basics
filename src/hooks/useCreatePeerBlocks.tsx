import React, { useEffect } from "react";
import { peerOneBlockchainState, peerThreeBlockchainState, peerTwoBlockchainState } from "../states/recoil/blockchain";
import { useRecoilState} from "recoil";
import { Block } from "../blockchain/block";

export const useCreatePeerBlocks = (peer: number) => {
  let chainState;
	switch (peer) {
		case 1:
			chainState = peerOneBlockchainState;
			break;
		case 2:
			chainState = peerTwoBlockchainState;
			break;
		case 3:
			chainState = peerThreeBlockchainState;
			break;
		default:
			chainState = peerOneBlockchainState;
			break;
	}

	const [blockchain, setBlockchain] = useRecoilState(chainState)

	const handleOnChangeHeader = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		setBlockchain(prev => {
			let blocksCopy = [...prev]
			let blockCopy = {...blocksCopy[index]}
			let nextBlockCopy = {...blocksCopy[index+1]}
			blockCopy.header = {...blockCopy.header, [e.target.name]: e.target.value}
			blockCopy.hash = Block.calHashOfBlock(blockCopy.header)
			if(nextBlockCopy)
				nextBlockCopy.header = {...nextBlockCopy.header, prevHash: blockCopy.hash}
			blocksCopy[index] = blockCopy
			return blocksCopy
		})
	}

	const handleOnChangeBody = (e: React.ChangeEvent<HTMLInputElement>, blockIndex: number, bodyIndex: number) => {
		setBlockchain(prev => {
			let blocksCopy = [...prev]
			let blockCopy = {...blocksCopy[blockIndex]}
			let headerCopy = {...blockCopy.header}
			let bodyCopy = [...blockCopy.body]
			let dataCopy = {...bodyCopy[bodyIndex]}
			dataCopy = {...dataCopy, [e.target.name]: e.target.value};
			bodyCopy[bodyIndex] =  dataCopy
			headerCopy.merkleRoot = Block.calMerkleRoot(bodyCopy)
			blockCopy.body = bodyCopy
			blockCopy.header = headerCopy
			blockCopy.hash = Block.calHashOfBlock(blockCopy.header)
			blocksCopy[blockIndex] = blockCopy
			
			return blocksCopy
		})
	}


  return {blockchain, handleOnChangeHeader, handleOnChangeBody}
};
