import React, { useEffect, useState } from 'react';

interface DebouncedSearchProps {
  onSearch: (query: string) => void;
  delay?: number;
}

const DebouncedSearch: React.FC<DebouncedSearchProps> = ({ onSearch, delay = 600 }) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, onSearch, delay]);

  return (
    <input
    style={{
        padding: '8px',
        width: '100%',
        marginBottom: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
      }}
      type="text"
      placeholder="Search by name, category or country"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default DebouncedSearch;
