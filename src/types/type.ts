export interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
  descriptionBn: string;
}
type category = {
  id: number;
  operatorName: string;
  serviceType: string;
  fare: number;
  currency: string;
  departureTime: string;
  estimatedDuration: string;
};

export interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  serviceType: string;
  from: string;
  to: string;
  distanceKm: number;
  duration: string;
  unit: string;
  unitNameBn: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  operators: category[];
  lastUpdated: string;
  fareNoteBn: string;
}