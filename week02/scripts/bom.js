const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

const li = document.createElement('li');
const deleteButton = document.createElement('button');

li.textContent = input.value;
deleteButton.textContent = '❌';
deleteButton.setAttribute('aria-label', `Remove ${input.value}`);
deleteButton.classList.add('delete');
li.appendChild(deleteButton);
list.append(li);