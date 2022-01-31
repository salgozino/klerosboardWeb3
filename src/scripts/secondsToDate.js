export function ConvertSectoDayHourMinSec(n) {
    var day =parseInt( n / (24 * 3600));

    n = n % (24 * 3600);
    var hour = parseInt(n / 3600);

    n %= 3600;
    var minutes = n / 60;

    n %= 60;
    var seconds = n;

    return(day + " days " + hour + " hours "
    + minutes.toFixed() + " minutes " +
    seconds.toFixed() + " seconds ");
}

export default function ConvertSectoDayHour(n) {
    var day =parseInt( n / (24 * 3600));

    n = n % (24 * 3600);
    var hour = parseInt(n / 3600);
    return(day + " days " + hour + " hours");
}