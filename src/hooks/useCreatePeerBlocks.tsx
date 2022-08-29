import React, { useEffect } from "react";
import { Tx } from "../blockchain/transaction";
import { ec } from "elliptic";
import { blockchainState, peerOneBlockchainState, peerThreeBlockchainState, peerTwoBlockchainState } from "../states/recoil/blockchain";
import { useRecoilValue } from "recoil";


const EC = new ec("secp256k1")

const createPublicKey = () => {
  const keyPair = EC.genKeyPair()
  const publicKey = keyPair.getPublic("hex");
  return publicKey;
}

const accounts: string[] = [];
for (let i = 0; i < 100; i++) {
  accounts.push(createPublicKey())
}

export const useCreatePeerBlocks = (peer?: number) => {
  let chainState = blockchainState;
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
			chainState = blockchainState;
			break;
	}
  const blockchain = useRecoilValue(chainState)

  return blockchain;
};
