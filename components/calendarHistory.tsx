'use client';

import { DatePicker, DatesProvider } from '@mantine/dates';
import { useCommonStore } from 'app/store/commonStore';
import { MantineProvider } from '@mantine/core';
import { useTheme } from 'next-themes';

export function CalendarHistory() {
  const { theme } = useTheme();
  const { selectedDate, setDate } = useCommonStore();

  return (
    // <></>
    // <Calendar
    //   mode="single"
    //   selected={selectedDate}
    //   onSelect={setDate}
    //   className="rounded-md border shadow"
    // />
    <MantineProvider forceColorScheme={theme === 'dark' ? 'dark' : 'light'}>
      <DatesProvider settings={{ consistentWeeks: true }}>
        <DatePicker />
      </DatesProvider>
    </MantineProvider>
  );
}
