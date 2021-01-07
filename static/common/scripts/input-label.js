const inputs = document.querySelectorAll('.input__input');
[...inputs.values()].forEach(input => {
    if (input.value === '')
        input.parentElement.style.visibility = 'collapse';
    input.addEventListener('input', e => {
        if (e.target.value.length > 0)
            input.parentElement.style.visibility = 'visible';
        else
            input.parentElement.style.visibility = 'collapse';
    })
});