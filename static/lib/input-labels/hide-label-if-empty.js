export var hideLabelIfEmpty = function (element) {
    var inputs = element.querySelectorAll('.input__input');
    inputs.forEach(function (input) {
        if (input.value === '')
            input.parentElement.style.visibility = 'collapse';
        input.addEventListener('input', function (e) {
            if (e.target.value.length > 0)
                input.parentElement.style.visibility = 'visible';
            else
                input.parentElement.style.visibility = 'collapse';
        });
    });
};
//# sourceMappingURL=hide-label-if-empty.js.map