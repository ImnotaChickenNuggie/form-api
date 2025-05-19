'use client';
import { Input } from "baseui/input";
import { format } from 'date-fns';

export function DatePickerWrapper({ value, onChange }) {
  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    onChange(newDate);
  };

  // Formatear la fecha para el input type="date"
  const formattedDate = value ? format(value, 'yyyy-MM-dd') : '';

  return (
    <Input
      type="date"
      value={formattedDate}
      onChange={handleDateChange}
      overrides={{
        Input: {
          style: {
            width: '100%',
            height: '48px',
          },
        },
      }}
    />
  );
} 