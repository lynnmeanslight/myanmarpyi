import { type Address } from "viem";

export const MYANMARPYI_ADDRESS = process.env
  .NEXT_PUBLIC_MYANMARPYI_ADDRESS as Address;

export const MyanmarPyiABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "MAX_LEN",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MIN_LEN",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "OWNER",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "cooldown",
    inputs: [],
    outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "emojiCount",
    inputs: [
      { name: "", type: "uint8", internalType: "uint8" },
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "uint8", internalType: "enum MyanmarPyi.Emoji" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMessages",
    inputs: [
      { name: "regionId", type: "uint8", internalType: "uint8" },
      { name: "start", type: "uint256", internalType: "uint256" },
      { name: "count", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "out",
        type: "tuple[]",
        internalType: "struct MyanmarPyi.Message[]",
        components: [
          { name: "author", type: "address", internalType: "address" },
          { name: "timestamp", type: "uint64", internalType: "uint64" },
          { name: "text", type: "string", internalType: "string" },
          { name: "hidden", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasReactedEmoji",
    inputs: [
      { name: "", type: "uint8", internalType: "uint8" },
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint8", internalType: "enum MyanmarPyi.Emoji" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hideMessage",
    inputs: [
      { name: "regionId", type: "uint8", internalType: "uint8" },
      { name: "index", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "maxRegion",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "messageCount",
    inputs: [{ name: "regionId", type: "uint8", internalType: "uint8" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "minRegion",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nextPostAt",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "post",
    inputs: [
      { name: "regionId", type: "uint8", internalType: "uint8" },
      { name: "text", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "reactEmoji",
    inputs: [
      { name: "regionId", type: "uint8", internalType: "uint8" },
      {
        name: "messageIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "emoji",
        type: "uint8",
        internalType: "enum MyanmarPyi.Emoji",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setCooldown",
    inputs: [{ name: "s", type: "uint64", internalType: "uint64" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPaused",
    inputs: [{ name: "p", type: "bool", internalType: "bool" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRegionBounds",
    inputs: [
      { name: "min", type: "uint8", internalType: "uint8" },
      { name: "max", type: "uint8", internalType: "uint8" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CooldownUpdated",
    inputs: [
      {
        name: "newCooldown",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EmojiReacted",
    inputs: [
      {
        name: "regionId",
        type: "uint8",
        indexed: true,
        internalType: "uint8",
      },
      {
        name: "messageIndex",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "emoji",
        type: "uint8",
        indexed: false,
        internalType: "enum MyanmarPyi.Emoji",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MessageHidden",
    inputs: [
      {
        name: "regionId",
        type: "uint8",
        indexed: true,
        internalType: "uint8",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MessagePosted",
    inputs: [
      {
        name: "regionId",
        type: "uint8",
        indexed: true,
        internalType: "uint8",
      },
      {
        name: "author",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "timestamp",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "text",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "paused",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RegionBoundsUpdated",
    inputs: [
      {
        name: "min",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
      {
        name: "max",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
    ],
    anonymous: false,
  },
] as const;

export type RegionNote = {
  author: Address;
  timestamp: bigint;
  text: string;
  hidden: boolean;
};

export function regionNumberFromId(id: string): number {
  // maps the REGIONS array order to 1-based ids expected by the contract
  // ensure REGIONS array is stable; adjust if the ordering changes
  const order = [
    "MM16",
    "MM14",
    "MM11",
    "MM01",
    "MM17",
    "MM12",
    "MM13",
    "MM04",
    "MM06",
    "MM05",
    "MM03",
    "MM07",
    "MM02",
    "MM15",
    "MM10",
  ];
  const idx = order.indexOf(id);
  return idx >= 0 ? idx + 1 : 0;
}
