import moment from 'moment';

const FORMAT_DATE = "DD.MM.YYYY";
const FORMAT_TIME = "HH:mm:ss";
const FROMAT_DATE_TIME = `${FORMAT_DATE} ${FORMAT_TIME}`;

/**
 * get today date base default format date
 * 
 * @return string
 */
const getToday = () => moment().format(FORMAT_DATE);

/**
 * get today date time from default format
 * 
 * @return string
 */
const getTodayDateTime = () => moment().format(FROMAT_DATE_TIME);

/**
 * change date time to specific format
 * or extract the date / time
 * 
 * @param date 
 * @param formatType 
 * 
 * @return string
 */
const formatDateTime = (date: any, formatType: string) => moment(date).format(formatType);

/**
 * check is requested date valid or not
 * exp. valid format: 01.01.2019
 * 
 * @param date 
 * 
 * @return boolean
 */
const isDateValid = (date: any) => {
    let isValid = true;
    const dateArr = date.split('.');

    if (dateArr.length === 3) {
        const isDayValid = dateArr[0] > 0 && dateArr[0] < 32;
        const isMonthValid = dateArr[1] > 0 && dateArr[1] < 13;
        const isYearValid = dateArr[2].length === 4;

        isValid = isDayValid && isMonthValid && isYearValid;
    } else {
        isValid = false;
    }

    return isValid;
}

export default {
  FORMAT_DATE,
  FORMAT_TIME,
  FROMAT_DATE_TIME,

  getToday,
  getTodayDateTime,
  formatDateTime,
  isDateValid,
};
