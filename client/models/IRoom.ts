export interface IRoom {
    _id?: string;
    title: string;
    desc: string;
    price: number;
    maxPeople: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
