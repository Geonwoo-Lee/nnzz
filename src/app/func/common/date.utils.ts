import {DayInfo} from "@/src/app/types/component/home/homeSelect";


class DateUtils {
    public static dateFormatFromDate = (
        date: Date,
        format: string = "yyyy-MM-dd"
    ) => {
        const fullYear = date.getFullYear().toString();
        const shortYear = fullYear.slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

        const formatTypes = ["yyyy", "yy", "MM", "dd", "HH", "mm", "ss", "SSS"];

        let result = format;
        formatTypes.forEach((type) => {
            switch (type) {
                case "yyyy":
                    result = result.replace(type, fullYear);
                    break;
                case "yy":
                    result = result.replace(type, shortYear);
                    break;
                case "MM":
                    result = result.replace(type, month);
                    break;
                case "dd":
                    result = result.replace(type, day);
                    break;
                case "HH":
                    result = result.replace(type, hours);
                    break;
                case "mm":
                    result = result.replace(type, minutes);
                    break;
                case "ss":
                    result = result.replace(type, seconds);
                    break;
                case "SSS":
                    result = result.replace(type, milliseconds);
                    break;
            }
        });

        return result;
    };


    public  static  getWeekDates = () : DayInfo[] => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const resultDate: DayInfo[] = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const date = String(currentDate.getDate()).padStart(2, '0');
            const dateString = `${month}${date}`;

            let dayString: string;
            if (i === 0) {
                dayString = "오늘";
            } else if (i === 1) {
                dayString = "내일";
            } else if (i === 2) {
                dayString = "모레";
            } else {
                dayString = `${days[currentDate.getDay()]}요일`;
            }

            resultDate.push({
                date: dateString,
                day: dayString
            });
        }

        return resultDate;
    }
}

export default DateUtils