export type BaseFormProps<T> = {
    /**
     * Valores para la iniciacion por defecto del formulario.
     */
    formData?: T;
    /**
     * Funcion que es llamada cuando se envia el formulario.
     * @param submitted 
     * @returns 
     */
    onFormSubmitted: (submitted: T) => void;
}