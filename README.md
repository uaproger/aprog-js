# aprog

 Допоміжна бібліотека js

*require for dev*

### Installation

```shell
npm install aprog --save-dev
```

or 

```shell
npm i aprog -D 
```

### Basic Usage

Підключення router:

```shell
import Categories from "./pages/Categories";
import Access from "./pages/Access";
import Unauthorized from "./pages/Unauthorized";

const routes = [
  {
    path: "/categories",
    component: Categories,
  },
  {
    path: "/access/denied",
    component: Access,
  },
  {
    path: "/unauthorized",
    component: Unauthorized,
  }
];

document.addEventListener("DOMContentLoaded", async function() {
  // router
  const body = document.body;
  await router({ routes, body, "Page Not Found" });
});

```

Створення Pages:

```shell

const NamePage = () => {
  return div({
    class: "w-full h-screen flex flex-col items-center justify-center text-3xl",
      value: [
        div({
          class: "text-red font-bold text-5xl",
          value: "Блок №1"
        }),
        div({value: "Блок №2"})
      ]
  });
}

export default NamePage;

```

Приклад використання методів формування HTML елементів:

```shell

const elDiv = div({
  id: "id-елементу",
  class: "class-елементу",
  style: {
    width: "30px",
    height: "40px"
  },
  onClick: () => {
    console.log("Приклад роботи onClick");
  },
  value: "Приклад блоку div"
});

document.body.appendChild(elDiv);

```

Приклад використання методів дебагу:

```shell

const int = 0;
const array = [1,2,3,4];
const boolean = true;

// виводить всі змінні в одній групі вкладок
dump(int, array, boolean);

// or 

// виводить всі змінні в одній групі вкладок та зупиняє подальше виконання скрипту
dd(int, array, boolean);

```

Загальний список методів:

- *dump(...args), dd(...args)*
- *redirect(url, { newTab: bool, replace: bool })*
- *encrypt(str), decrypt(encryptedStr)*


- *div, span, button, a, img, meta, label, input, select, option, options, form, hr, textarea, table, thead, tbody, tr, th, td, pre* 
- *_get, GUID, apState, cookie, date, pause, apFetch, chars, elementToObject, copyText, scrollToTop, scrollToBottom, firstKey, checkArrays, ucfirst, deepEqual, nodeListToObject*
- *isEmpty, isNull, isFloat, isNumeric, isObject, isArray, isNumber, isString, isPromise, isNull, isFloat, isNumeric, isObject*


### Info

- З часом будуть додаватися можливості створення додаткових інструментів


### License
MIT License

Copyright (c) 2025 AlexProger

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*&copy; AlexProger 2025*