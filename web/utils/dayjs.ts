import dayjs from 'dayjs';
import dayjsCalendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(dayjsCalendar);
dayjs.extend(relativeTime);

dayjs().calendar(null, {
  sameElse: 'MMM DD, YYYY, h:mm A',
});

export default dayjs;
