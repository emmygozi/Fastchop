class Validator {
  static hasAminLength(value) {
    const newValue = value.trim();
    return newValue.length >= 3;
  }

  static isNumber(number) {
    const numberToString = number.toString();
    return numberToString.match(/^\d+$/);
  }
}

export default Validator;
