export interface IUser {
    id?: number,
    name: string,
    email: string,
    email_verified_at?: Date,
    phone?: string,
    address_id?: number,
    language_id?: number,
    created_at: Date,
    updated_at: Date
}