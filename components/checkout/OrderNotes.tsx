"use client";

import React from 'react';
import TextArea from '@/components/ui/TextArea';

interface OrderNotesProps {
  value: string;
  onChange: (value: string) => void;
}

export default function OrderNotes({ value, onChange }: OrderNotesProps) {
  return (
    <TextArea
      label="Special Instructions"
      value={value}
      onChange={onChange}
      placeholder="Any special instructions for delivery or order preparation..."
      rows={3}
      maxLength={500}
    />
  );
}
