export const postOrder = async (order: any) => {
  const NEXT_PUBLIC_URL = "****"
  console.log("post Order check public url", NEXT_PUBLIC_URL)
  let response = await fetch(NEXT_PUBLIC_URL.concat("/api/processOrder"), {
    method: "POST",
    body: JSON.stringify(order),
    headers: new Headers({ "content-type": "application/json" }),
  })
  let response_json = await response.json()
  console.log("backend response: ", response_json)
  return response_json
}
