interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
}

export interface User {
  type: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
}