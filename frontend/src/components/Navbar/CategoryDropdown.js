import React from 'react';

const CategoryDropdown = ({ categories, selected, onChange }) => {
  return (
    <select
  className="form-select form-select-sm border-0 rounded-0"
  value={selected}
  onChange={(e) => onChange(e.target.value)}
  style={{
    borderRight: '1px solid #ccc',
    borderRadius: '20px 0 0 20px',
    height: '100%',
    backgroundColor: 'white',
  }}
>
  <option value="All">All</option>
  {categories.map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select>

  );
};

export default CategoryDropdown;
