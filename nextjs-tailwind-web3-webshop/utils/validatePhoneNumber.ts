// this only checks if the number consists of 10 digits
// later need to really check, please...

export default function validatePhoneNumber(input_str: string) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
  return re.test(input_str)
}
