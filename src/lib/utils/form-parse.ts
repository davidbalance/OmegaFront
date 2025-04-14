export const parseForm = (form: EventTarget & HTMLFormElement) => {
    const formData = new FormData(form);
    const formValue: Record<string, string> = {};

    formData.forEach((value, key) => {
        formValue[key] = value as string;
    });

    return formValue;

}