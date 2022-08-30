import { Block, BlockHeader } from "../../blockchain/block";
import { Tx } from "../../blockchain/transaction";

export let blockData = [
  {
    hash: "0000dca7bce8b5a6f0ebee325d4f1c7b68a4b41d3385ede3fa35ee52dfff5af2",
    header: {
      difficulty: 4,
      index: 0,
      merkleRoot:
        "bae4c2d6a209e3684cc9be1c19a367592bdcaf817ff51cad39d629d8ff1d9f16",
      nonce: 118939,
      prevHash:
        "0000000000000000000000000000000000000000000000000000000000000000",
      timestamp: 1661754230579,
    },
    body: [
      { from: "Elvis", to: "Antonia", amount: 29 },
      { from: "Milly", to: "Adeel", amount: 87 },
    ],
  },

  {
    hash: "000030c04b4043ac873a786561723db384ff6da23f7e53b5e644db72d946a188",
    header: {
      difficulty: 4,
      index: 1,
      merkleRoot:
        "7f539cc42f0b843fdf5adbe8a1b19ac099544fdb2b4e5031345408b3f7292046",
      nonce: 59063,
      prevHash:
        "0000dca7bce8b5a6f0ebee325d4f1c7b68a4b41d3385ede3fa35ee52dfff5af2",
      timestamp: 1661754231004,
    },
    body: [
      { from: "Carlos", to: "Jerome", amount: 100 },
      { from: "Darsh", to: "Milton", amount: 12 },
      { from: "Kaylum", to: "Connor", amount: 1 },
    ],
  },

  {
    hash: "0000bc6f9948c0f8a056470a8efc46843c3960d4ae20d4166c3a89273f6c6a42",
    header: {
      difficulty: 4,
      index: 2,
      merkleRoot:
        "b8cafc3349e1ed1124f3b775b1034b696b8642c0b97c112f3477eb78f987274a",
      nonce: 36406,
      prevHash:
        "000030c04b4043ac873a786561723db384ff6da23f7e53b5e644db72d946a188",
      timestamp: 1661754231263,
    },
    body: [
      { from: "Debra", to: "Caleb", amount: 11 },
      { from: "Joely", to: "Eduard", amount: 27 },
      { from: "Graeme", to: "Hanan", amount: 8 },
      { from: "Erik", to: "Aaryan", amount: 210 },
    ],
  },

  {
    hash: "0000a31ba39ff268604a8d03762a6389244547bf604e8b559a121df874ff1e25",
    header: {
      difficulty: 4,
      index: 3,
      merkleRoot:
        "b3e888bdad326d4d98b58df6e852c69f08061bfbbaf032f9df8fd5669058d053",
      nonce: 193040,
      prevHash:
        "0000bc6f9948c0f8a056470a8efc46843c3960d4ae20d4166c3a89273f6c6a42",
      timestamp: 1661754232629,
    },
    body: [
      { from: "Anderson", to: "Christiana", amount: 12 },
      { from: "Fabio", to: "Bobbie", amount: 46 },
      { from: "Darien", to: "Kelsey", amount: 92 },
    ],
  },

  {
    hash: "0000bc0984855d2fd688e92d5b27cb2212d2269e786bde2f6cac2fb4e697601e",
    header: {
      difficulty: 4,
      index: 4,
      merkleRoot:
        "b0ec6996843a40d3cabb6fa5131ed99a70c1546d4c80ba0cd816d94721f0a06d",
      nonce: 38101,
      prevHash:
        "0000a31ba39ff268604a8d03762a6389244547bf604e8b559a121df874ff1e25",
      timestamp: 1661754232907,
    },
    body: [
      { from: "Asiyah", to: "Eugene", amount: 10 },
      { from: "Arielle", to: "Wilma", amount: 74 },
    ],
  },

  {
    hash: "00004f3719bbc7cb07b6af7ed0671ce88584bf18dd733f26e94e182ea729c703",
    header: {
      difficulty: 4,
      index: 5,
      merkleRoot:
        "8872baf9315a05c004836775cf8d6011a43f7425888d024e354f9b11280666b8",
      nonce: 62327,
      prevHash:
        "0000bc0984855d2fd688e92d5b27cb2212d2269e786bde2f6cac2fb4e697601e",
      timestamp: 1661754233357,
    },
    body: [
      { from: "Catrina", to: "Harris", amount: 36 },
      { from: "Rea", to: "Brodie", amount: 85 },
    ],
  },

] as Block[];


const difficulty = 4;
let bodys = [
	[
		{from: "Elvis", to:"Antonia", amount: 29},
		{from: "Milly", to:"Adeel", amount: 87},
	],
	[
		{from: "Carlos", to:"Jerome", amount: 100},
		{from: "Darsh", to:"Milton", amount: 12},
		{from: "Kaylum", to:"Connor", amount: 1},
	],
	[
		{from: "Debra", to:"Caleb", amount: 11},
		{from: "Joely", to:"Eduard", amount: 27},
		{from: "Graeme", to:"Hanan", amount: 8},
		{from: "Erik", to:"Aaryan", amount: 210},
	],
	[
		{from: "Anderson", to:"Christiana", amount: 12},
		{from: "Fabio", to:"Bobbie", amount: 46},
		{from: "Darien", to:"Kelsey", amount: 92},
	],
	[
		{from: "Asiyah", to:"Eugene", amount: 10},
		{from: "Arielle", to:"Wilma", amount: 74},
	],
	[
		{from: "Catrina", to:"Harris", amount: 36},
		{from: "Rea", to:"Brodie", amount: 85},
	],
] as Tx[][]
let blocks = [
	
] as Block[]

const createBlocks = () => {
	for (let i = 0; i < bodys.length; i++) {
		let body = bodys[i]
		let header: BlockHeader = {
			index: i,
			difficulty,
			nonce: 0,
			merkleRoot: Block.calMerkleRoot(body),
			prevHash: !!i ? blocks[i-1].hash : "0".repeat(64),
			timestamp: 0,
		}
		const newBlock = Block.createNewBlock(header, body)
		console.log(newBlock)
		Block.mineNewBlock(newBlock, blocks);
	}
}
