'use client';

// import { Calendar } from '@/components/ui/calendar';
import { useCommonStore } from 'app/store/commonStore';

export function CalendarHistory() {
  const { selectedDate, setDate } = useCommonStore();

  return (
    <></>
    // <Calendar
    //   mode="single"
    //   selected={selectedDate}
    //   onSelect={setDate}
    //   className="rounded-md border shadow"
    // />
  );
}
