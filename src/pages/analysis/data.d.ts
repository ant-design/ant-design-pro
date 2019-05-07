export interface IVisitData {
  x: string;
  y: number;
}

export interface IVisitData2 {
  x: string;
  y: number;
}

export interface ISalesData {
  x: string;
  y: number;
}

export interface ISearchData {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
}

export interface IOfflineData {
  name: string;
  cvr: number;
}

export interface IOfflineChartData {
  x: any;
  y1: number;
  y2: number;
}

export interface ISalesTypeData {
  x: string;
  y: number;
}

export interface ISalesTypeDataOnline {
  x: string;
  y: number;
}

export interface ISalesTypeDataOffline {
  x: string;
  y: number;
}

export interface IRadarData {
  name: string;
  label: string;
  value: number;
}

export interface IAnalysisData {
  visitData: IVisitData[];
  visitData2: IVisitData2[];
  salesData: ISalesData[];
  searchData: ISearchData[];
  offlineData: IOfflineData[];
  offlineChartData: IOfflineChartData[];
  salesTypeData: ISalesTypeData[];
  salesTypeDataOnline: ISalesTypeDataOnline[];
  salesTypeDataOffline: ISalesTypeDataOffline[];
  radarData: IRadarData[];
}
