import { gql } from "@apollo/client"

export const GET_ORDER_BY_TX = (tx: string) => gql`
  query MyQuery {
    getOrders(tx: "${tx}") {
      created_at
      id
    }
  }
`
export const GET_USER_BY_ADDRESS = (address: string) => gql`
  query MyQuery {
    getUsers(address: "${address}") {
      created_at
      id
    }
  }
`
