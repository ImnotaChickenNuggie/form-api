'use client';
import { Input } from "baseui/input";
import { format } from 'date-fns';

export function DatePickerWrapper({ value, onChange }) {

  const handleDateChange = (e) => {
    const isoDateString = e.target.value; 
    onChange(isoDateString);
  };

  const today = new Date();

  // Formatear la fecha para el input type="date"
  const formattedDate = value ? format(new Date(value), 'yyyy-MM-dd') : '';

  return (
    <Input
      type="date"
      value={formattedDate}
      onChange={handleDateChange}
      min={format(today, 'yyyy-MM-dd')}
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