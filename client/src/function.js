//

const mFunction = {
    validateEmail: (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email)
    },
    validatePassword: (val) => {
        return val.length >= 6
    },

    validateObseneWord: (str) => {
        var ObseneWord = [
            "đụ", "Đụ", "duma", "dume", "ditconmem", "dkm", "vcl", "cdmm", "dmm", "cdm", "clm", "cl", 'cc', "cặc", "cu", "lồn", "loz",
            "cak", "đỉ", "đĩ", "fucking", "asshole", "motherfucker", "dick", "cock", "bitch", "chó đẻ", "cho de", "địt", "dit"
        ];
        let arrayChar = str.toLowerCase().split(' ');
        for (var i = 0; i < ObseneWord.length; i++) {
            if (arrayChar.indexOf(ObseneWord[i]) != -1) return true
        }
        return false;
    },

    validatePhoneNumber: (input_str) => {
        var re = /(0+([0-9]{9})\b)/g;
        return re.test(input_str);
    },
    makeId: (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

}
module.exports = mFunction;