export const hideLabelIfEmpty = (element: HTMLElement) => {
    const inputs: NodeListOf<HTMLInputElement> = element.querySelectorAll('.input__input');
    inputs.forEach(input => {
        if (input.value === '')
            input.parentElement!.style.visibility = 'collapse';
        input.addEventListener('input', e => {
            if ((e.target as HTMLInputElement).value.length > 0)
                input.parentElement!.style.visibility = 'visible';
            else
                input.parentElement!.style.visibility = 'collapse';
        })
    });
}
