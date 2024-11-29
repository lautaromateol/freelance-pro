/* eslint-disable @typescript-eslint/no-explicit-any */
import SelectComponent from 'react-select/creatable';
import { SingleValue } from "react-select"

type Props = {
  placeholder: string
  value?: string | null | undefined
  onChange?: (...event: any[]) => void
  disabled: boolean
  options?: { label: string, value: string }[]
  onCreate: (value: string) => void
}

export function Select({ onChange, disabled, options, value, onCreate, placeholder }: Props) {

  function handleSelectChange(option: SingleValue<{ label: string; value: string; }>) {
    onChange?.(option?.value)
  }

  function handleCreateOption(value: string) {
    onCreate(value)
  }

  const formattedValue = options?.find((option) => option.value === value)

  return (
    <SelectComponent
      placeholder={placeholder}
      className="text-sm h-10"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0",
          ":hover": {
            borderColor: "#e2e8f0",
          }
        })
      }}
      value={formattedValue}
      onChange={handleSelectChange}
      isDisabled={disabled}
      options={options}
      onCreateOption={handleCreateOption}
    />
  );
};