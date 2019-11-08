import moment from 'moment';

const FORMAT_DATE = "DD.MM.YYYY";
const FORMAT_TIME = "HH:mm:ss";
const FROMAT_DATE_TIME = `${FORMAT_DATE} ${FORMAT_TIME}`;

const getToday = () => moment().format(FORMAT_DATE);

const formatDateTime = (date: any, formatType: string) => moment(date).format(formatType);

export default {
  FORMAT_DATE,
  FORMAT_TIME,
  FROMAT_DATE_TIME,

  getToday,
  formatDateTime,
};
