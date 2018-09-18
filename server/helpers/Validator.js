class Validator {
  static hasAminLength(value) {
    return value.length >= 3;
  }

  static isNumber(number) {
    const numberToString = number.toString();
    return numberToString.match(/^\d+$/);
  }
}

export default Validator;
