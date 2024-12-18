import {DayInfo} from "@/src/app/types/page/home/homeSelect";


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

    public static mealRenderer = (type: string) => {
        switch (type) {
            case 'lunch' : return '점심'
            case 'dinner': return '저녁'
            default: return '점심'
        }
    }

    public static getWeekdayWithTimezone = (dateString: string) => {
        if (!dateString) return '';

        const targetDate = new Date(dateString);
        if (isNaN(targetDate.getTime())) return '';

        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        targetDate.setHours(0, 0, 0, 0);

        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 0) {
            return '오늘';
        } else if (diffDays === 1) {
            return '내일';
        } else if (diffDays === 2) {
            return '모레';
        } else {
            const koreaDate = new Date(targetDate.getTime() + (9 * 60 * 60 * 1000));
            const weekdayIndex = koreaDate.getUTCDay();
            return `${weekdays[weekdayIndex]}요일`;
        }
    }


    public  static  formatDateToKorean(dateString: string): string {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            throw new Error('Invalid date format. Expected: YYYY-MM-DD');
        }

        const [year, month, day] = dateString.split('-');
        return `${year}년${month}월${day}일`;
    }


    public  static  getWeekDates = () : DayInfo[] => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const resultDate: DayInfo[] = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const date = String(currentDate.getDate()).padStart(2, '0');
            const dateString = `${month}월 ${date}일`;

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

    public  static  parseDateString = (dateString: string): Date | null => {
        const [month, day] = dateString.split('월 ');
        if (!month || !day) return null;

        const currentYear = new Date().getFullYear();
        const parsedMonth = parseInt(month, 10) - 1;
        const parsedDay = parseInt(day.replace('일', ''), 10);

        if (isNaN(parsedMonth) || isNaN(parsedDay)) return null;

        return new Date(currentYear, parsedMonth, parsedDay);
    };
}

export default DateUtils