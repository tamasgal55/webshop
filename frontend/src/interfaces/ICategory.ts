export interface ICategory {
    id?: number;
    name_hu?: string;
    name_en?: string;
    child_categories?: any[],
    label: string;
    parent_category_id?: number | null;
    parent_category?: ICategory;
    parent_category_hu?: string,
    parent_category_en?: string,
    parent_category_merged?: string,
    items?: ICategory[];
    attributes?: any
}
  