import { useCallback, useMemo, useState } from "react";
import { Combobox, Listbox, Stack, Tag, TextStyle } from "@shopify/polaris";
import { AutoSelection } from "@shopify/polaris";
import { useLocalStorage } from "@client/hooks";

interface TagsProp {
  selectedTags: Array<string>;
  updateTags: (arr: Array<string>) => void;
}

export function Tags(props: TagsProp) {
  const [selectedTags, setSelectedTags] = useState(props.selectedTags);
  const [suggestedTags, setSuggestedTags] = useLocalStorage(
    "suggested_tags",
    []
  );
  const [value, setValue] = useState("");

  const removeDuplicates = <T,>(arr: Array<T>): Array<T> =>
    Array.from(new Set(arr));

  const updateSelection = useCallback(
    (selected) => {
      const nextSelectedTags = new Set([...selectedTags]);
      if (nextSelectedTags.has(selected)) {
        nextSelectedTags.delete(selected);
      } else {
        nextSelectedTags.add(selected);
      }

      setSelectedTags(Array.from(nextSelectedTags).sort());

      props.updateTags(Array.from(nextSelectedTags));

      suggestedTags.forEach((tag) => nextSelectedTags.add(tag));
      setSuggestedTags(Array.from(nextSelectedTags));
      setValue("");
    },
    [selectedTags]
  );

  const removeTag = useCallback(
    (tag) => () => {
      updateSelection(tag);
    },
    [updateSelection]
  );

  const getAllTags = useCallback(() => {
    return removeDuplicates<string>([...suggestedTags, ...selectedTags]).sort();
  }, [suggestedTags, selectedTags]);

  const formatOptionText = useCallback(
    (option) => {
      const trimValue = value.trim().toLocaleLowerCase();
      const matchIndex = option.toLocaleLowerCase().indexOf(trimValue);

      if (!value || matchIndex === -1) return option;

      const start = option.slice(0, matchIndex);
      const highlight = option.slice(matchIndex, matchIndex + trimValue.length);
      const end = option.slice(matchIndex + trimValue.length, option.length);

      return (
        <p>
          {start}
          <TextStyle variation="strong">{highlight}</TextStyle>
          {end}
        </p>
      );
    },
    [value]
  );

  const options = useMemo(() => {
    let list;
    const allTags = getAllTags();
    const filterRegex = new RegExp(value, "i");

    if (value) {
      list = allTags.filter((tag) => tag.match(filterRegex));
    } else {
      list = allTags;
    }

    return [...list];
  }, [value, getAllTags]);

  const verticalContentMarkup =
    selectedTags.length > 0 ? (
      <Stack spacing="extraTight" alignment="center">
        {selectedTags.map((tag) => (
          <Tag key={`option-${tag}`} onRemove={removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </Stack>
    ) : null;

  const optionMarkup =
    options.length > 0
      ? options.map((option) => {
          return (
            <Listbox.Option
              key={option}
              value={option}
              selected={selectedTags.includes(option)}
              accessibilityLabel={option}
            >
              <Listbox.TextOption selected={selectedTags.includes(option)}>
                {formatOptionText(option)}
              </Listbox.TextOption>
            </Listbox.Option>
          );
        })
      : null;

  const noResults = value && !getAllTags().includes(value);

  const actionMarkup = noResults ? (
    <Listbox.Action value={value}>{`Add "${value}"`}</Listbox.Action>
  ) : null;

  const listboxMarkup =
    optionMarkup || actionMarkup ? (
      <Listbox autoSelection={AutoSelection.First} onSelect={updateSelection}>
        {actionMarkup}
        {optionMarkup}
      </Listbox>
    ) : null;

  return (
    <div style={{ height: "225px" }}>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            autoComplete="off"
            label="Search tags"
            labelHidden
            value={value}
            placeholder="Search tags"
            verticalContent={verticalContentMarkup}
            onChange={setValue}
          />
        }
      >
        {listboxMarkup}
      </Combobox>
    </div>
  );
}
