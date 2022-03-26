function checkEmail(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email)
}
module.exports = checkEmail;

function removeAccents(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();;
}
module.exports = removeAccents;

function CheckObseneWord(str) {
    var ObseneWord = [
        "đụ", "Đụ", "duma", "dume", "ditconmem", "dkm", "vcl", "cdmm", "dmm", "cdm", "clm", "cl", 'cc', "cặc", "cu", "lồn", "loz",
        "cak", "đỉ", "đĩ", "fucking", "asshole", "motherfucker", "dick", "cock", "bitch", "chó đẻ", "cho de", "địt", "dit"
    ];
    let arrayChar = str.toLowerCase().split(' ');
    for (var i = 0; i < ObseneWord.length; i++) {
        if (arrayChar.indexOf(ObseneWord[i]) != -1) return true
    }
    return false;
}
module.exports = CheckObseneWord

function validatePhoneNumber(input_str) {
    var re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return re.test(input_str);
}
module.exports = validatePhoneNumber;