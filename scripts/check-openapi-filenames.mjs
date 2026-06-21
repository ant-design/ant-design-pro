import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const serviceDir = join(process.cwd(), 'src/services/ant-design-pro');
const serviceFiles = new Set(readdirSync(serviceDir));
const expectedFiles = ['Api.ts', 'Login.ts', 'Rule.ts'];
const staleFiles = ['api.ts', 'login.ts', 'rule.ts'];

const missingFiles = expectedFiles.filter(
  (fileName) => !serviceFiles.has(fileName),
);
const lowercaseFiles = staleFiles.filter((fileName) =>
  serviceFiles.has(fileName),
);

if (missingFiles.length || lowercaseFiles.length) {
  console.error(
    [
      missingFiles.length
        ? `Missing PascalCase service files: ${missingFiles.join(', ')}`
        : '',
      lowercaseFiles.length
        ? `Found stale lowercase service files: ${lowercaseFiles.join(', ')}`
        : '',
    ]
      .filter(Boolean)
      .join('\n'),
  );
  process.exit(1);
}
