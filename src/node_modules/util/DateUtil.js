
class DateUtil {
    getLongDate(date) {
        return date.getFullYear() + "/"
            + (date.getMonth() + 1)
            + "/" + date.getDate()
            + " " + date.getHours()
            + ":" + date.getMinutes()
            + " " + date.getSeconds();
    }
}

export default new DateUtil()