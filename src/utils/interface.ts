interface Geo {
    lat: string;
    lng: string;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface SelectDropdown {
    label: string;
    value: number;
}

export interface Post {
    body: string;
    id: number;
    title: string;
    userId: number;
}

export interface Comment {
    postId: number;
    body: string;
    id: number;
    name: string;
    email: string;
}

export interface PostParams {
    userId: number;
}

export interface CommentParams {
    postId: number;
}
