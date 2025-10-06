# aprog

 Допоміжна бібліотека js

*require for dev*

### NPM resource

```shell
https://www.npmjs.com/package/aprog
```

### Installation

```shell
npm install aprog --save-dev
```

or 

```shell
npm i aprog -D 
```

Завантаження `Constructs`
```shell
node node_modules/aprog/publish.js
```

Завантаження `Constructs` з перезаписом
```shell
node node_modules/aprog/publish.js --force
```

### Basic Usage

Підключення router:

```shell
import Categories from "./pages/Categories";
import Access from "./pages/Access";
import Unauthorized from "./pages/Unauthorized";

const routes = [
  {
    path: "/",
    component: NamePage,
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
  const main = document.getElementById('main');
  await router({ routes, main, "Page Not Found" });
});

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

Приклад використання gemini:

у файл __.env__ потрібно додати api-ключ __VITE_GEMINI_KEY=you_api_gemini_key__
```shell

const message = await gemini("Розкажи жарт про програміста!");
console.log(message);

```

Робота з __mathInput__: в input вводимо 2+2=

```shell

onInput: (event) => {
  const res = mathInput(event.target);
  console.log(res);
}

```
Результат: 4 *(повертається з функції та встановлює значення у input)*
```shell
<input value="4">
```

########## ########## ########## ########## ##########

Загальний список методів:

- *dump(...args), dd(...args)*
- *redirect(url, { newTab: bool, replace: bool }), reload(delaySeconds), validateEmail(email), validatePassword(password)*
- *encrypt(str), decrypt(encryptedStr)*

- *div, span, button, a, img, meta, label, input, select, option, options, form, hr, textarea, table, caption, thead, tbody, tr, th, td, pre, attachCustomTitle* 
- *_get, _getAll, GUID, apState, date, pause, apFetch, chars, elementToObject, copyText, scrollToTop, scrollToBottom, firstKey, checkArrays, ucfirst, deepEqual, nodeListToObject*
- *isEmpty, isNull, isFloat, isNumeric, isObject, isArray, isNumber, isString, isPromise, isNull, isFloat, isNumeric, isObject*

- *router({ routes, main })*

- *navi("/path", {data: "Можливість передачі даних між сторінками"})*

- *gemini(message)*

- *mathInput(event.target)*

- *cookie, storage*

- *saveItem("id", data), loadItem("id")*

- *uniquePage({key: "default", callbackTrue: () => {"empty"}, callbackFalse: () => {"empty"}, timer: "default")*

- *const wrap = (value) => new SmartWrapper(value);*
- *wrap(data).get("key").val*

### Info

- Додано безплатний чат із `Gemini`
- Додано методи збереження зашифрованих даних `saveItem` та `loadItem`
- Додвано `Wrapper` та `Toast`
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