export type DataObject = {
    type: string;
    id: string;
    url: string;
    images: Images;
    slug: string;
    title: string;
};

type Images = {
    original: {
        url: string;
    }
}
type Pagination = {
    total_count: number;
    count: number;
    offset: number;
};

type Meta = {
    status: number;
    msg: string;
    response_id: string;
};

export type GiphyObject = {
    data: Array<DataObject>;
    meta: Meta;
    pagination: Pagination;
};