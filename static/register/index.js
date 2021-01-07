const registerInputs = document.querySelectorAll('input');
const button = document.querySelector('button');

const nameMap = new Map([
    [0, 'email'],
    [1, 'login'],
    [2, 'first_name'],
    [3, 'second_name'],
    [4, 'phone'],
    [5, 'password'],
    [6, 'repeat-password'],
]);

button.onclick = e => {
    e.preventDefault();
    const res = [...registerInputs.values()]
        .reduce((acc, input, index) => ({...acc, [nameMap.get(index)]: input.value}), {})
    console.log(res);
};