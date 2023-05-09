import { IImage } from "./IImage";

export default interface ICompany {
    name: string,
    image: string,
    contact_phone: string,
    contact_email: string,
    headquarters_country: string,
    headquarters_postal_code: number,
    headquarters_city: string,
    headquarters_address_line_one: string,
    headquarters_address_line_two?: string

}