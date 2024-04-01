export type BaseFormProps<T> = {
    formData?: T;
    onFormSubmitted: (submitted: T) => void;
}