export interface IHotel {
    _id: string;
    title: string;
    name: string;
    type: string;
    desc: string;
    descShort: string;
    city: string;
    address: string;
    distance: string;
    photos: string[];
    cheapestPrice: number;
    featured: boolean;
    rating: number;
    score: number;
    rooms: string[];
    __v: number;
}
