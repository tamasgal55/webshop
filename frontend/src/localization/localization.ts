// messages with string keys are coming from the backend application
export const messages = {
    en: {
        'The selected lang code is invalid.': 'The selected language code is invalid.',
        'Unauthenticated.': 'Your session has expired. Please log in again!',
        'These credentials do not match our records.': 'You have entered an invalid email or password.',
        'Success': 'Success',
        navbar: {
            advertisements: 'Advertisements',
            our_partners: 'Our partners',
            start: 'Start',
            categories: 'Categories',
            attributes: 'Attributes',
            products: 'Products'
        },
        login: {
            login: 'Login',
            password: 'Password',
            register_question: 'Don\'t have an account ?',
            register: 'Register',
            submit_login: 'Login',
            forgot_password: 'Forgot password?',
            login_comment: 'Sign in to your account',
            logged_in: 'Logged in successfully',
        },
        register: {
            register: 'Register',
            register_comment: 'Create New Account',
            password: 'Password',
            password_confirmation: 'Password confirmation',
            login_question: 'Already have an account ?',
            login: 'Login',
            submit_registration: 'Register',
            name: 'Name',
            name_placeholder: 'Your Name'
        },
        profile: {
            profile: 'Profile',
            logout: 'Logout',
            login: 'Login',
            register: 'Registration',
            personal_information: 'Personal information',
            personal_information_comment: 'This information will be displayed publicly so be careful what you share!',
            name: 'Name',
            email_address: 'E-mail address',
            phone: 'Phone',
            create_company: 'Create company',
            admin: 'Administration'
        },
        address: {
            country: 'Country',
            postal_code: 'Postal code',
            city: 'City',
            address_line_one: 'Address line 1',
            address_line_two: 'Address line 2',
        },
        list_a_product: {
            list_a_product: 'List a product',
            name: 'Name',
            price: 'Price',
            description: 'Description',
            add_image: 'Add image',
            add_image_help: 'You can select multiple images',
            new_advertisement: 'New advertisement',
            price_help: 'The price is in Hungarian forints'
        },
        create_company: {
            title: 'Create your own Webshop',
            submit_label: 'Create',
            company_name: 'Company name',
            basics: 'Basics',
            contact: 'Contact',
            headquarters: 'Headquarters',
            contact_email: 'E-mail address',
            contact_phone: 'Phone number',
            logo: 'Company logo'
        },
        company_management_categories: {
            title: 'Here you can edit your categories',
            navigation_preview: 'Preview of your navigation bar',
            all_categories: 'All categories',
            selected_categories: 'Selected categories',
            select_categories_info_1: 'Choose the categories you want to use',
            select_categories_info_2: 'You can check the hierarchy on our main page',
            save_changes: 'Save changes',
            categories_saved: 'Categories saved'
        },
        company_management_start: {
            title: 'Here you can manage your company'
        },
        custom_table: {
            new_button: 'New',
            delete_button: 'Delete',
            tooltip_edit: 'Edit',
            tooltip_delete: 'Delete',
        },
        admin_categories: {
            title: 'Here you can edit the product\'s categories',
            navigation_preview: 'Preview of the navigation bar',
            name_hu: 'Hungarian name',
            name_en: 'English name',
            parent_category: 'Parent category',
            new_category_dialog_header: 'Add new category',
            edit_category_dialog_header: 'Edit category',
            category_dialog_submit: 'Save',
            all_attributes: 'All attributes',
            selected_attributes: 'Selected attributes',
            category_created: 'Category added',
            category_updated: 'Category updated',
            category_deleted: 'Category deleted',
            inherited: 'Inherited',
            own: 'Own',
            attributes: 'Attributes:',
            warning: 'If you can\'t find an attribute then it is already attached to a parent or child category!'
        },
        admin_attributes: {
            name_hu: 'Hungarian name',
            name_en: 'English name',
            type: 'Type',
            unit: 'Unit',
            new_attribute_dialog_header: 'Add new attribute',
            edit_attribute_dialog_header: 'Edit attribute',
            new_attribute_dialog_submit: 'Save',
            attribute_created: 'Attribute added',
            attribute_deleted: 'Attribute deleted',
            attribute_updated: 'Attribute updated',
            delete_attribute: 'Delete attribute',
            confrim_dialog_question: 'Are you sure want to delete this attribute?',
            affected_categories: 'This attribute was attached to the following categories:',
            categories_will_lose_this_attribute: 'If you continue they will lose this attribute'
        },
        confirm_dialog: {
            header: 'Confirmation',
            single_message: 'Are you sure you want to proceed?',
            multiple_message: 'Are you sure you want to proceed?',
            reject_label: 'No',
            accept_label: 'Yes'
        },
        toast: {
            error: 'Error'
        }
    },
    hu: {
        'The selected lang code is invalid.': 'A kiválasztott nyelvi kód érvénytelen.',
        'Unauthenticated.': 'Az Ön munkamenete lejárt. Kérjük, jelentkezzen be újra!',
        'These credentials do not match our records.': 'Érvénytelen e-mail címet vagy jelszót adott meg.',
        'Success': 'Siker',
        navbar: {
            advertisements: 'Hírdetések',
            our_partners: 'Partnereink',
            start: 'Kezdőlap',
            categories: 'Kategóriák',
            attributes: 'Tulajdonságok',
            products: 'Termékek'
        },
        login: {
            login: 'Bejelentkezés',
            password: 'Jelszó',
            register_question: 'Nincs fiókod ?',
            register: 'Regisztrálj',
            submit_login: 'Bejelentkezés',
            forgot_password: 'Elfejeltett jelszó?',
            login_comment: 'Lépj be a fiókodba',
            logged_in: 'Sikeres bejelentkezés',
        },
        register: {
            register: 'Regisztráció',
            register_comment: 'Új fiók létrehozása',
            password: 'Jelszó',
            password_confirmation: 'Jelszó megerősítése',
            login_question: 'Már van fiókod ?',
            login: 'Jelentkezz be',
            submit_registration: 'Regisztráció',
            name: 'Név',
            name_placeholder: 'Saját Név'
        },
        profile: {
            profile: 'Profil',
            logout: 'Kijelentkezés',
            login: 'Bejelentkezés',
            register: 'Regisztráció',
            personal_information: 'Személyes adatok',
            personal_information_comment: 'Ezek az információk publikusak, ezért legyen óvatos mit oszt meg!',
            name: 'Név',
            email_address: 'E-mail cím',
            phone: 'Telefonszám',
            create_company: 'Cég létrehozása',
            admin: 'Adminisztráció'
        },
        address: {
            country: 'Ország',
            postal_code: 'Irányítószám',
            city: 'Város',
            address_line_one: 'Címsor 1',
            address_line_two: 'Címsor 2',
        },
        list_a_product: {
            list_a_product: 'Hírdetésfeladás',
            name: 'Név',
            price: 'Ár',
            description: 'Leírás',
            add_image: 'Kép hozzáadása',
            add_image_help: 'Több képet is kiválaszhat',
            new_advertisement: 'Új hírdetés',
            price_help: 'Az ár forintban értendő'
        },
        create_company: {
            title: 'Hozd létre a saját Webshopod',
            submit_label: 'Létrehozás',
            company_name: 'Cégnév',
            basics: 'Alapok',
            contact: 'Kapcsolat',
            headquarters: 'Székhely',
            contact_email: 'E-mail cím',
            contact_phone: 'Telefonszám',
            logo: 'Céglogó'

        },
        company_management_categories: {
            title: 'Itt szerkesztheted a termék kategóriákat',
            navigation_preview: 'A navigációs sáv előnézete',
            all_categories: 'Minden kategória',
            selected_categories: 'Kiválasztott kategóriák',
            select_categories_info_1: 'Válaszd ki a kategóriákat, amelyeket használni szeretnél',
            select_categories_info_2: 'A hierarchiát a főoldalunkon láthatod',
            save_changes: 'Változtatások mentése',
            categories_saved: 'Kategóriák mentve'
        },
        company_management_start: {
            title: 'Itt irányíthatja a cég ügyeit'
        },
        custom_table: {
            new_button: 'Új',
            delete_button: 'Törlés',
            tooltip_edit: 'Szerkesztés',
            tooltip_delete: 'Törlés',
        },
        admin_categories: {
            title: 'Itt szerkesztheted a termék kategóriákat',
            navigation_preview: 'A navigációs sáv előnézete',
            name_hu: 'Magyar név',
            name_en: 'Angol név',
            parent_category: 'Szülő kategória',
            new_category_dialog_header: 'Új kategória hozzáadása',
            edit_category_dialog_header: 'Kategória szerkesztése',
            category_dialog_submit: 'Mentés',
            all_attributes: 'Összes tulajdonság',
            selected_attributes: 'Kiválasztott tulajdonságok',
            category_created: 'Kategória hozzáadva',
            category_updated: 'Kategória módosítva',
            category_deleted: 'Kategória törölve',
            inherited: 'Örökölt',
            own: 'Saját',
            attributes: 'Tulajdonságok:',
            warning: 'Ha nem találsz egy tulajdonságot, akkor már hozzá van rendelve egy szülő vagy gyerek kategóriához!'
        },
        admin_attributes: {
            name_hu: 'Magyar név',
            name_en: 'Angol név',
            type: 'Típus',
            unit: 'Mértékegység',
            new_attribute_dialog_header: 'Új tulajdonság hozzáadása',
            edit_attribute_dialog_header: 'Tulajdonság szerkesztése',
            new_attribute_dialog_submit: 'Mentés',
            attribute_created: 'Tulajdonság hozzáadva',
            attribute_deleted: 'Tulajdonság törölve',
            attribute_updated: 'Tulajdonság módosítva',
            delete_attribute: 'Tulajdonság törlése',
            confrim_dialog_question: 'Biztosan törlöd ezt a tulajdonságot?',
            affected_categories: 'Ez a tulajdonság a következő kategóriákhoz van rendelve: ',
            categories_will_lose_this_attribute: 'Ha folytatod elviszítik ezt a tulajdonságot'
        },
        confirm_dialog: {
            header: 'Megerősítés',
            single_message: 'Biztosan folytatod?',
            multiple_message: 'Biztosan folytatod?',
            reject_label: 'Nem',
            accept_label: 'Igen'
        },
        toast: {
            error: 'Hiba'
        }
    }
}