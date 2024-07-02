export interface LocationModel {
  access: Access[];
  address: Address;
  categories: Category[];
  distance: number;
  id: string;
  position: Position;
  resultType: string;
  title: string;
}

export interface Access {
  lat: number;
  lng: number;
}

export interface Address {
  city: string;
  countryCode: string;
  countryName: string;
  county: string;
  district: string;
  label: string;
  postalCode: string;
}

export interface Category {
  id: string;
  name: string;
  primary: boolean;
}

export interface Position {
  lat: number;
  lng: number;
}
