export interface Location {
    id: number;
    city: string;
    state: string;
    country: string;
    create_timestamp: string;
    update_timestamp: string;
  }

  export interface Institution {
    id: number;
    name: string;
  }
  
  export interface Major {
    id: number;
    name: string;
  }
  
  export interface Degree {
    id: number;
    name: string;
  }