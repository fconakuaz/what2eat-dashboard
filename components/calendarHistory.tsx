'use client';

import { Calendar, DatesProvider } from '@mantine/dates';
import { useCommonStore } from 'app/store/commonStore';
import { MantineProvider } from '@mantine/core';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';
import { useLanguageStore } from '@/app/store/languajeStore';

export function CalendarHistory() {
  const { theme } = useTheme();
  const { selectedDate, setDate } = useCommonStore();
  const { locale } = useLanguageStore();

  const [selected, setSelected] = useState<Date[]>([new Date()]);
  const handleSelect = (date: Date) => {
    setSelected((current) => [date]);
    setDate(date);
  };

  return (
    <MantineProvider forceColorScheme={theme === 'dark' ? 'dark' : 'light'}>
      <DatesProvider settings={{ consistentWeeks: true, locale }}>
        <Calendar
          getDayProps={(date) => ({
            selected: selected.some((s) => dayjs(date).isSame(s, 'date')),
            onClick: () => handleSelect(date)
          })}
        />
      </DatesProvider>
    </MantineProvider>
  );
}
