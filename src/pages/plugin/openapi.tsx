import { useEffect, useState } from 'react';
import { SwaggerUIBundle } from 'swagger-ui-dist';
import 'swagger-ui-dist/swagger-ui.css';

const projects = [
  { name: 'swagger', label: 'Swagger' },
  { name: 'oneapi', label: 'OneAPI' },
];

const OpenAPI = () => {
  const [value, setValue] = useState('swagger');

  useEffect(() => {
    SwaggerUIBundle({
      url: `/umi-plugins_${value}.json`,
      dom_id: '#swagger-ui',
    });
  }, [value]);

  return (
    <div style={{ padding: 24 }}>
      <select
        style={{
          position: 'fixed',
          right: '16px',
          top: '8px',
          zIndex: 1000,
        }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      >
        {projects.map((p) => (
          <option key={p.name} value={p.name}>
            {p.label}
          </option>
        ))}
      </select>
      <div id="swagger-ui" />
    </div>
  );
};

export default OpenAPI;
