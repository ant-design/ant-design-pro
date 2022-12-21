import { theme } from 'antd/lib';
import { convertLegacyToken } from '@ant-design/compatible/lib';

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);
export const v4Token = convertLegacyToken(mapToken);
console.log(JSON.stringify(v4Token, null, 4));
