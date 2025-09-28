import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '../../../hooks/useDebounce';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search users...',
}) => {
  const debouncedValue = useDebounce(value, 300);

  React.useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <Input
      prefix={<SearchOutlined />}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      allowClear
    />
  );
};

export default SearchInput;
