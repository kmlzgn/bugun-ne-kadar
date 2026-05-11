"use client";

import React from "react";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const id = React.useId;

export function AmountInput({ value, onChange, disabled }: AmountInputProps) {
  const inputId = React.useId();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    onChange(raw);
  }

  return (
    <div className="relative">
      <label
        htmlFor={inputId}
        className="sr-only"
      >
        Tutar (Türk Lirası)
      </label>
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium text-lg select-none">
        ₺
      </span>
      <input
        id={inputId}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder="1.000"
        aria-label="Tutar (Türk Lirası)"
        className="
          w-full pl-10 pr-4 py-4
          bg-white border border-zinc-200
          rounded-2xl text-xl font-semibold text-zinc-900
          placeholder:text-zinc-300
          focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-shadow duration-150
          shadow-sm hover:shadow-md
        "
      />
    </div>
  );
}
