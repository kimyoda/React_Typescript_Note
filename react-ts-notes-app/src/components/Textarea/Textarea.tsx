export const Textarea = ({
  value,
  onChange,
  limit = 100,
  placeholder = "Type some text here...",
}: Props) => {
  return (
    <>
      <textarea
        maxLength={limit}
        className="textarea"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      <p className="is-size-7 my-1">Characters left: {limit - value.length}</p>
    </>
  );
};

interface Props {
  value: string;
  onChange: (value: string) => void;
  limit?: number;
  placeholder?: string;
}
