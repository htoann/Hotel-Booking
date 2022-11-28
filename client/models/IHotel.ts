export interface Address {
    name: string;
    lat: number;
    lng: number;
    _id?: string;
}

export interface IHotel {
    _id: string;
    title: string;
    type: string;
    desc: string;
    descShort: string;
    city: string;
    address: Address;
    distance: string;
    photos: string[];
    cheapestPrice: number;
    featured: boolean;
    rating?: number;
    score?: number;
    rooms: string[];
    __v: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    user?: string
}
