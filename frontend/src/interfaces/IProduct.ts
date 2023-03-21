export interface IProduct {
    'id'?: number,
    'name': string,
    'price': number,
    'description': string,
    'created_at': Date,
    'updated_at': Date,
    'user_id': number,
    'images': string[]
}