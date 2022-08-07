class CustomSelect {
    #id;
    #options;
    #currentSelectedOption;
    constructor(id, options) {
        this.#id = id;
        this.#options = options;
      
        CustomSelect.#instances.set(id, this);
    }
    get selectedValue() {
        return this.#currentSelectedOption;
    }
    render(container) {
        let div = document.createElement("div"),
            button = document.createElement("button"),
            span = document.createElement("span"),
            ul = document.createElement("ul");
 
        div.className = `select-dropdown select-dropdown--${this.#id}`;
        button.className = `select-dropdown__button select-dropdown__button--${this.#id}`;
        span.className = `select-dropdown select-dropdown--${this.#id}`;
        ul.className = `select-dropdown__list select-dropdown__list--${this.#id}`;
 
        span.innerText = "Выберите Элемент";
        button.append(span);
        div.append(button, ul);
 
        for (let e of this.#options) {
            let li = document.createElement("li");
            li.className = "select-dropdown__list-item";
            li.textContent = e.text;
            li.dataset.value = e.value;
            ul.append(li);
            li.onclick = CustomSelect.#li_click;
        }
 
        container.append(div);
 
        button.onclick = CustomSelect.#button_click;
    }
    static #button_click(event) {
        event.preventDefault(); 
        this.nextElementSibling.classList.toggle("active");
    }
    static #li_click() {
        let ul = this.parentElement,
            prev = ul.querySelector(".selected");
        if (prev && prev !== this)
            prev.classList.remove("selected");
 
        this.classList.add("selected");
        ul.parentElement.querySelector(".select-dropdown")
            .textContent = this.dataset.value;
        let id = ul.className.match(/\bselect-dropdown__list--([^-]+?)\b/)[1];
        let instance = CustomSelect.#instances.get(id);
        instance.#currentSelectedOption = instance.#options.find(e => e.value === +this.dataset.value);
 
       
        console.log(instance.selectedValue);
    }
    static #instances = new Map();
}
const options = [
    { value: 1, text: 'JavaScript' },
    { value: 2, text: 'NodeJS' },
    { value: 3, text: 'ReactJS' },
    { value: 4, text: 'HTML' },
    { value: 5, text: 'CSS' },
];
const customSelect = new CustomSelect('123', options);
const mainContainer = document.querySelector('#container');
customSelect.render(mainContainer);