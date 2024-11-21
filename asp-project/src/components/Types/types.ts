interface TRule {
    message: string;
    validate: (value: any) => boolean;
}

export interface TField {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    description?: string;
    rules?: TRule[];
}

export type TDivider = 'horizontal' | 'vertical';
