const changePasswordInputs = document.querySelectorAll('input');
const button = document.querySelector('button');

const nameMap = new Map([
    [0, 'oldPassword'],
    [1, 'newPassword'],
    [2, 'newPasswordRepeat'],
]);

button.onclick = e => {
    e.preventDefault();
    const res = [...changePasswordInputs.values()].reduce((acc, input, index) => ({...acc, [nameMap.get(index)]: input.value}), {})
    console.log(res);
};