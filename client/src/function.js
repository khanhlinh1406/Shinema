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
    availableRoom: (newListDateTime, defaultListDateTime, runtime) => {
        let newList = []
        let defaultList = []

        newListDateTime.forEach(newItem => {
            defaultListDateTime.forEach(defaultItem => {
                if (newItem.date == defaultItem.date) {
                    newList.push(newItem)
                    defaultList.push(defaultItem)
                }
            });
        })

        const subTime = (time1, time2) => {
            let time1Arr = time1.split(':')
            let h1 = time1Arr[0]
            let m1 = time1Arr[1]

            let time2Arr = time2.split(':')
            let h2 = time2Arr[0]
            let m2 = time2Arr[1]

            return Math.abs((h1 - h2) * 60 + (m1 - m2))
        }

        let result = true
        for (let i = 0; i < newList.length; i++) {

            newList[i].times.forEach(newTime => {
                defaultList[i].times.forEach(defaultTime => {
                    if (parseInt(subTime(newTime, defaultTime)) < (parseInt(runtime) + 30)) {
                        result = false
                        return
                    }
                })
            })
        }

        return result
    },
    subTime: (time1, time2) => {
        let time1Arr = time1.split(':')
        let h1 = time1Arr[0]
        let m1 = time1Arr[1]

        let time2Arr = time2.split(':')
        let h2 = time2Arr[0]
        let m2 = time2Arr[1]

        return Math.abs((h1 - h2) * 60 + (m1 - m2))
    },

    availableSeat: (listBookedSeats, listRoomSeats, currentSeat) => {
        if (listRoomSeats.contains(currentSeat)) {
            if (listBookedSeats.contains(currentSeat)) {
                return false;
            }

            return true;
        }

    }

}
module.exports = mFunction;