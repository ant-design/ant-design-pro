import React from 'react';

const LayoutSetting = ({ value, onChange }) => {
  return (
    <div
      style={{
        margin: 5,
        display: 'flex',
      }}
    >
      {['left', 'top'].map(layout => (
        <div
          onClick={() => onChange && onChange(layout)}
          key={layout}
          style={{
            flex: 1,
            margin: 5,
            border: '1px solid #ddd',
            borderColor: value === layout ? 'red' : '#ddd',
            textAlign: 'center',
          }}
        >
          {layout}
        </div>
      ))}
    </div>
  );
};

export default LayoutSetting;
