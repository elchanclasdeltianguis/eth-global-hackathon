import { gql } from "@apollo/client"
import { IOrder } from "../typings"

export const INSERT_USER = (address: string) => gql`
  mutation MyMutation {
    insertUsers(address: "${address}", created_at: "${new Date().toISOString()}") {
      address
      id
    }
  }
`

export const INSERT_ORDER = (
  amount_mxn: number,
  amount_token: number,
  chain_id: number,
  phone: string,
  product_code: string,
  token: string,
  tx: string,
  address: string
) => gql`
  mutation MyMutation {
    insertOrders(
      amount_mxn: ${amount_mxn}
      amount_token: ${amount_token}
      chain_id: ${chain_id}
      created_at: "${new Date().toISOString()}"
      input_field: "${phone}"
      product_code: "${product_code}"
      token: "${token}"
      tx: "${tx}"
      user_address: "${address}"
    ) {
      id
    }
  }
`
