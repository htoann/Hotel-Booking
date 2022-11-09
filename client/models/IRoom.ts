export interface RoomNumber {
    number: number;
    unavailableDates: any[];
    _id: string;
}

export interface IRoom {
    _id: string;
    title: string;
    desc: string;
    price: number;
    maxPeople: number;
    roomNumbers: RoomNumber[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
