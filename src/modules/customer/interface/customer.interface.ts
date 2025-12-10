export interface Customer {
  id?: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  created_at?: Date;
  updated_at?: Date;
}
