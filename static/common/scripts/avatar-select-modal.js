const avatar = document.querySelector('.avatar');

const modalWrapper = document.createElement('div');
const modal = document.createElement('div');
const title = document.createElement('p');
const imgInput = document.createElement('input');
const label = document.createElement('label');
const imgHolder = document.createElement('img');

imgHolder.classList.add('modal-wrapper__img-holder');
title.classList.add('modal-wrapper__title');
label.classList.add('modal-wrapper__button', 'button');
modalWrapper.classList.add('modal-wrapper');
modal.classList.add('modal-wrapper__modal');

label.innerText = 'Выбрать файл';
title.innerText = 'Загрузите фотографию';
imgInput.type = 'file';
imgInput.style.visibility = 'hidden';

modal.appendChild(title);
modal.appendChild(imgHolder);
modal.appendChild(label);
modalWrapper.appendChild(modal);

const closeModal = () => {
    document.body.removeChild(modalWrapper);
    document.removeEventListener('click', clickOutsideHandler);
    imgHolder.removeAttribute('src');
    label.removeEventListener('click', labelAfterFillingClickHandler);
    title.innerText = 'Загрузите фотографию';
    label.innerText = 'Выбрать файл';
};

const labelAfterFillingClickHandler = () => {
    closeModal();
};

const clickOutsideHandler = e => {
    if (!modal.contains(e.target))
        closeModal()
};

imgInput.onchange = () => {
    const reader = new FileReader();
    reader.readAsDataURL(imgInput.files[0]);
    reader.addEventListener("load", () => {
        imgHolder.src = reader.result;
        label.innerText = 'Поменять';
        label.addEventListener('click', labelAfterFillingClickHandler);
        title.innerText = 'Фотография загружена';
    });
};

avatar.addEventListener('click', e => {
    e.stopPropagation();
    document.addEventListener('click', clickOutsideHandler);
    label.appendChild(imgInput);
    document.body.appendChild(modalWrapper);
});