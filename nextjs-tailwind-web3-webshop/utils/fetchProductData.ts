import siprelData from "../testData/data.json"

export const fetchProductData = async () => {
  // let response = await fetch("*********"), {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   body: new URLSearchParams({
  //     key: process.env.SIPREL_API_KEY,
  //     nip: process.env.SIPREL_API_NIP,
  //   }),
  // })

  // let response_json = await response.json()

  return siprelData // response_json.data
}
