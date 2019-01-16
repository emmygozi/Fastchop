class Validator {
  static hasAminLength(value) {
    const newValue = value.trim();
    return newValue.length >= 3;
  }

  static isNumber(number) {
    const numberToString = number.toString();
    return numberToString.match(/^\d+$/);
  }

  static isEmail(mail) {
    return (mail.match(/\S+@\S+\.\S+/));
  }

  static isWhiteSpace(input) {
    return !input.match(/^\s*$/);
  }
}

export default Validator;
