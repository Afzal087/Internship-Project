
export interface Address {

  address_type: 'CURRENT' | 'PERMANENT' | 'MAILING'; 

  
  country: string;
  countryCode: string;
  state: string;
  city: string;
  street: string;
  buildingNo: string;
  postal_code?: string;
  
}