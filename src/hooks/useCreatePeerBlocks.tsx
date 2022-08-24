import React, { useEffect } from "react";
import { Tx } from "../blockchain/transaction";
import { ec } from "elliptic";

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

export const useCreatePeerBlocks = () => {
	useEffect(() => {
		
  
	}, []);
};
