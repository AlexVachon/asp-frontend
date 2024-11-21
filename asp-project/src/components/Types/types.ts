interface TRule {
    message: string;
    validate: (value: any) => boolean;
}

export type TAuthForm = 'LogIn' | 'SignIn';

export interface TField {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    description?: string;
    required?: boolean;
    rules: TRule[];
}

export type TDivider = 'horizontal' | 'vertical';
