const loginInputs = document.querySelectorAll('input');
const button = document.querySelector('button');

const nameMap = new Map([
    [0, 'login'],
    [1, 'password'],
]);

button.onclick = e => {
    e.preventDefault();
    const res = [...loginInputs.values()]
        .reduce((acc, input, index) => ({...acc, [nameMap.get(index)]: input.value}), {})
    console.log(res);
};