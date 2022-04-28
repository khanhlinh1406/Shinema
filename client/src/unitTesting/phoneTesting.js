function validatePhoneNumber(input_str) {
    var re = /(0+([0-9]{9})\b)/g;
    return re.test(input_str);
}
module.exports = validatePhoneNumber;