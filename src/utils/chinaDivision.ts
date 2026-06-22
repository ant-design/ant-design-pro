import hkMoTwSource from 'china-division/dist/HK-MO-TW.json';
import pcaSource from 'china-division/dist/pca-code.json';

export type GeographicOption = {
  label: string;
  key: string;
};

type DivisionNode = {
  code: string;
  name: string;
  children?: DivisionNode[];
};

const directAdminCodes = new Set(['11', '12', '31', '50']);

const specialRegions: GeographicOption[] = [
  { label: '台湾省', key: '710000' },
  { label: '香港特别行政区', key: '810000' },
  { label: '澳门特别行政区', key: '820000' },
];

const toProvinceKey = (code: string) => `${code}0000`;

const toCityKey = (code: string) => (code.length === 4 ? `${code}00` : code);

const toOption = (item: DivisionNode): GeographicOption => ({
  label: item.name,
  key: toCityKey(item.code),
});

export const provinceOptions: GeographicOption[] = [
  ...(pcaSource as DivisionNode[]).map((item) => ({
    label: item.name,
    key: toProvinceKey(item.code),
  })),
  ...specialRegions,
];

export const getCityOptions = (provinceKey: string): GeographicOption[] => {
  const provinceCode =
    provinceKey.length === 2 ? provinceKey : provinceKey.slice(0, 2);
  const province = (pcaSource as DivisionNode[]).find(
    (item) => item.code === provinceCode,
  );

  if (province) {
    const children = province.children ?? [];
    const cityNodes = directAdminCodes.has(provinceCode)
      ? children.flatMap((item) => item.children ?? [item])
      : children;

    return cityNodes.map(toOption);
  }

  const specialRegion = specialRegions.find((item) => item.key === provinceKey);
  if (!specialRegion) {
    return [];
  }

  return Object.keys(
    (hkMoTwSource as Record<string, Record<string, string[]>>)[
      specialRegion.label
    ] ?? {},
  ).map((name, index) => ({
    label: name,
    key: `${provinceCode}${String(index + 1).padStart(2, '0')}00`,
  }));
};
