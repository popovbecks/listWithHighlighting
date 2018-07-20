"Use strict"
window.onload = function () {
    render();
}
let rootElement = document.querySelector('.root');
let model = [];
let arrayOfListItemsName = ['Кристофер Робин', 'Винни-Пух', 'Ослик Иа', 'Мудрая Сова', 'Кролик. Просто кролик.'];
rootElement.addEventListener('click', processSelecting);

function render(inititalModel) {
    let listOfElements = Array.from(rootElement.children);
    let mode = inititalModel;
    let displayField = document.querySelector('.display-id-field');
    if(!model.length && !listOfElements.length) {
        createListItem();
    }
    listOfElements.forEach(item => {
        if(mode.indexOf(+item.getAttribute('data-id')) != -1) {
            item.classList.add('selected')
        }else item.classList.remove('selected')
    })
    displayField.textContent = model.toString();
}

function processSelecting(event) {
    let target = event.target;
    if(target.tagName != "LI") return;
    let targetAttr = target.getAttribute('data-id');
    let index = model.indexOf(+targetAttr);
    //select logic command&click or click, check target, update the model
    if(event.metaKey && event.which == 1) {
        if(index != -1) {
            model.splice(index, 1)
        } else  if(index == -1) model.push(+targetAttr)
    } else {
        model.length = 0;
        model.push(+targetAttr)
    }
    render(model);
}

function createElement(tag, props, ...children) {
    const element = document.createElement(tag);
    for (let prop in props) {
        if (!props.hasOwnProperty(prop)) continue;
        element[prop] = props[prop]; //element.type = props['type'];
    }
    if (children.length > 0) {
        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }
            element.appendChild(child);
        });
    }
    return element;
}

function createListItem () {
    for (let i =0; i < arrayOfListItemsName.length; i++) {
        const li = createElement('li', {
            className: 'input'
        }, arrayOfListItemsName[i])
        li.setAttribute('data-id', [i])
        rootElement.appendChild(li);
    }
}



