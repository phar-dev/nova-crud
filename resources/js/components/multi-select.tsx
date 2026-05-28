'use client';

import * as React from 'react';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox';

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  name: string;
  options: Option[];
  selected: string[];
  placeholder?: string;
};

const MultiSelect = ({ name, options, selected, placeholder = 'Select...' }: MultiSelectProps) => {
  const anchor = useComboboxAnchor();

  const items = React.useMemo(
    () => options.map((o) => ({ value: o.value, label: o.label })),
    [options],
  );

  const initialSelected = React.useMemo(
    () => items.filter((item) => selected.includes(item.value)),
    [items, selected],
  );

  const [selectedValues, setSelectedValues] = React.useState<Option[]>(initialSelected);

  // Sync state when initialSelected changes (e.g., navigating between edit pages)
  React.useEffect(() => {
    setSelectedValues(initialSelected);
  }, [initialSelected]);

  return (
    <div ref={anchor}>
      <Combobox
        multiple
        items={items}
        itemToStringLabel={(item: Option) => item.label}
        itemToStringValue={(item: Option) => item.value}
        value={selectedValues}
        onValueChange={setSelectedValues}
      >
        <ComboboxChips>
          <ComboboxValue>
            {(value: Option[]) => (
              <React.Fragment>
                {value.map((item) => (
                  <ComboboxChip key={item.value}>{item.label}</ComboboxChip>
                ))}
              </React.Fragment>
            )}
          </ComboboxValue>
          <ComboboxChipsInput placeholder={selectedValues.length === 0 ? placeholder : ''} />
        </ComboboxChips>

        <ComboboxContent anchor={anchor}>
          <ComboboxList>
            {(item: Option) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>

      {selectedValues.map((item) => (
        <input key={item.value} type="hidden" name={`${name}[]`} value={item.value} />
      ))}
    </div>
  );
};

export default MultiSelect;
