import { IDefaultTokenList, ITokens } from "../typings"

export const chainDefaultToken: IDefaultTokenList = {
  1: "usdc",
  56: "busd",
  137: "usdc",
  250: "usdc",
  //   43114: "usdc",
}

// tokens and addresses commented out below cannot be sendt to binance

export const TOKENS: ITokens = {
  // morralla: {
  //   symbol: "morralla",
  //   address: {
  //     // 1: "",
  //     56: "0xadcBAEbaac0f775923eBDFb6B904399DA8801275",
  //     // 137: "",
  //     // 250: "",
  //     // 43114: "",
  //   },
  //   decimals: 18,
  // },
  busd: {
    symbol: "busd",
    address: {
      //   1: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
      56: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      // 137: "0xa8d394fe7380b8ce6145d5f85e6ac22d4e91acde",
      // 250: "",
      // 43114: "0x19860CCB0A68fd4213aB9D8266F7bBf05A8dDe98",
    },
    decimals: 18,
    oracle: { 56: "0xcBb98864Ef56E9042e7d2efef76141f15731B82f" },
  },
  dai: {
    symbol: "dai",
    address: {
      1: "0x6b175474e89094c44da98b954eedeac495271d0f",
      //   56: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
      // 137: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      // 250: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
      // 43114: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
    },
    decimals: 18,
    oracle: { 1: "0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9" },
  },
  usdc: {
    symbol: "usdc",
    address: {
      1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      //   56: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      250: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
      137: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      //   43114: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    },
    decimals: 6,
    oracle: {
      1: "0x8fffffd4afb6115b954bd326cbe7b4ba576818f6",
      137: "0xfe4a8cc5b5b2366c1b58bea3858e81843581b2f7",
      250: "0x2553f4eeb82d5a26427b8d1106c51499cba5d99c",
    },
  },
}
