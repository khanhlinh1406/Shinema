const EmailTesting = require('./emailTesting')
const PhoneTesting = require('./phoneTesting')

test('check email theostevenson1880@gmail.com is true', () => {
    expect(EmailTesting('theostevenson1880@gmail.com')).toBe(true);
});
test('check email theostevenson@@gmail.com is false', () => {
    expect(EmailTesting('theostevenson@@gmaile.com')).toBe(false);
});
test('check email pvdthien@gmial.coml is false', () => {
    expect(EmailTesting('pvdthien@gmial.com')).toBe(false);
});
test('check email " " is false', () => {
    expect(EmailTesting(' ')).toBe(false);
});
test('check email "aaa" is false', () => {
    expect(EmailTesting('aaa')).toBe(false);
});


test('check phone 0358075274 is true', () => {
    expect(PhoneTesting('0358075274')).toBe(true);
});
test('check phone 1358075274 is false', () => {
    expect(PhoneTesting('1358075274')).toBe(false);
});
test('check phone 035807w27b is false', () => {
    expect(PhoneTesting('035807w27b')).toBe(false);
});
test('check phone 03580752745 is false', () => {
    expect(PhoneTesting('03580752745')).toBe(false);
});
test('check phone " " is false', () => {
    expect(PhoneTesting(' ')).toBe(false);
});