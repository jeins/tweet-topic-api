import moment from 'moment';

class Helpers {
  static extractRequiredFields(data: []) {
    return data.map(({
      id_str: id,
      created_at,
      user: { id_str }
    }) => ({
      id,
      userId: id_str,
      createdAt: Helpers.getCreatedDateTime(created_at),
      date: Helpers.getDate(created_at),
      time: Helpers.getTime(created_at),
    }));
  }

  static changeDateFormat(strDate: string) {
    const cleanDate = strDate.replace("+0000 ", "") + " UTC";
    return new Date(cleanDate);
  }

  static getDate(strDate: string) {
    const date = Helpers.changeDateFormat(strDate);
  
    return moment(date).format("DD.MM.YYYY");
  }

  static getTime(strDate: string) {
    const date = Helpers.changeDateFormat(strDate);
  
    return moment(date).format("HH:mm:ss");
  }

  static getCreatedDateTime(strDate: string) {
    const date = Helpers.changeDateFormat(strDate);
  
    return moment(date).format("DD.MM.YYY HH:mm:ss");
  }
}

export default Helpers;