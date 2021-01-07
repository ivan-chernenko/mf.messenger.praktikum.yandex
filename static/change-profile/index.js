const changeProfileInputs = document.querySelectorAll('input');
const button = document.querySelector('button');

const nameMap = new Map([
    [0, 'email'],
    [1, 'first_name'],
    [2, 'second_name'],
    [3, 'login'],
    [4, 'display_name'],
    [5, 'phone'],
]);

button.onclick = e => {
    e.preventDefault();
    const res = [...changeProfileInputs.values()]
        .reduce((acc, input, index) => ({...acc, [nameMap.get(index)]: input.value}), {})
    console.log(res);
};