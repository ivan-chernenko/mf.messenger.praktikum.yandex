const newMessageInput = document.querySelector('input');
const button = document.querySelector('button');
button.onclick = (e) => {
    e.preventDefault();
    console.log({
        message: newMessageInput.value
    })
};