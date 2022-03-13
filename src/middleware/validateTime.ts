export function validTime(date: string): boolean {
    if (Date.parse(date)) {
        return true;
    }
    return false;
}
export function activityTime(date: string): boolean {
    let scheduledDate: string = new Date(date).toString();
    let times: string[] = getActivityTime();
    console.log(times);
    if (times.includes(scheduledDate)) {
        return true;
    }
    return false
}

function getActivityTime(): string[] {
    let lastDate: Date = new Date();
    lastDate.setDate(lastDate.getDate() + 30);
    let daylist: Date[] = getDaysArray(new Date(), lastDate);
    let time: string[] = [];
    daylist.forEach(element => {
        for (let h: number = 9; h <= 20; h++) {
            for (let m: number = 0; m < 2; m++) {
                let dateNow = new Date();
                if (element.getDate() == dateNow.getDate() &&
                    (h < dateNow.getHours() ||
                        (h == dateNow.getHours() &&
                            m <= dateNow.getMinutes()))) {
                    continue;
                }
                time.push(new Date(element.getUTCFullYear(),
                    element.getUTCMonth(),
                    element.getDate(),
                    h, m * 30).toString());
            }
        }
    });
    return time;
}

function getDaysArray(firstDate: Date, lastDate: Date): Date[] {
    let days: Date[] = [];
    for (let tempDate = new Date(firstDate); tempDate <= lastDate; tempDate.setDate(tempDate.getDate() + 1)) {
        if (tempDate.getDay() != 5 && tempDate.getDay() != 6) {
            days.push(new Date(tempDate));
        }
    }
    return days;
};