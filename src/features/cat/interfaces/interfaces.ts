// Example of how I work with matching API interfaces to typed interfaces within TypeScript. Only added properties from the API interfaces which I am working with

export interface IApiImage {
    id: number;
    original_filename: string;
    url: string;
}

interface IApiCategory {
    id: number;
    name: string;
}

interface IApiBreed {
    id: number;
    name: string;
}

export interface IApiImages extends IApiImage {
    categories: IApiCategory;
    breeds: IApiBreed;
}

export interface IApiFavorite {
    id: number;
    image_id: number;
}

export interface IApiVote {
    id: number;
    image_id: number;
    value: number;
}