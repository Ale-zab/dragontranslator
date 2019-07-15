
var btnTranslate = document.querySelector('.btn-translate');
var langStart = document.querySelectorAll('.lang-start');
var langFinish = document.querySelectorAll('.lang-finish');
var translate = document.querySelector('.translate');
var openStart = document.querySelector('.fas-open-start');
var modalBlockStart = document.querySelector('.modal-block-start');
var faTimes = document.querySelector('.fa-times');
var modalBlockFinish = document.querySelector('.modal-block-finish');
var fasFinish = document.querySelector('.fas-finish');
var faTimesFinish = document.querySelector('.fa-times-finish');

var langTranslatorStart = "ru";
var langTranslatorFinish = "en";

function langGo() {
    for(var i = 0; i < langStart.length; i++) {
        var langStartClick = langStart[i].value;

        if(langStartClick == event.target.value) {
            langStart[i].classList.add("lang-start-active");
            langTranslatorStart = event.target.lang;
        };

        if(langStartClick !== event.target.value) {
            langStart[i].classList.remove("lang-start-active");
        };

    }
};

for(var q = 0; q < langStart.length; q++) {
    langStart[q].addEventListener('click', langGo);
};

function langEnd() {
    for(var a = 0; a < langFinish.length; a++) {
        var langFinishClick = langFinish[a].value;

        if(langFinishClick == event.target.value) {
            langFinish[a].classList.add("lang-finish-active");
            langTranslatorFinish = event.target.lang;
        };

        if(langFinishClick !== event.target.value) {
            langFinish[a].classList.remove("lang-finish-active");
        };

    }
};

for(var b = 0; b < langFinish.length; b++) {
    langFinish[b].addEventListener('click', langEnd);
};





btnTranslate.addEventListener('click', function () {

    var startTranslate = document.querySelector('.start-translate').value;

    if(startTranslate == "") {
        alert("Пожалуйста, заполните поле для превода");
    } else {
        // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
        var req = new XMLHttpRequest();

        // Сохраняем ключ API, полученный со страницы https://tech.yandex.ru/keys/get/?service=trnsl
        // (с примером ниже работать не будет, нужно получить и вставить свой!)
        var API_KEY = 'trnsl.1.1.20190621T090420Z.630d57fd42dc27a6.710460775630657fd0040a499b992120b83c19f6';

        // Сохраняем адрес API
        var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';


        // Формируем полный адрес запроса:
        url += '?key=' + API_KEY; // добавляем к запросу ключ API
        url += '&text=' + startTranslate; // текст для перевода
        url += '&lang=' + langTranslatorStart + '-' + langTranslatorFinish; // направление перевода: с русского на английский

        // Таким образом формируется строка вида:
        // https://translate.yandex.net/api/v1.5/tr.json/translate?key=example_api_key&text=кролики&lang=ru-en

        var translate = document.querySelector('.finish-translate');

        // Назначаем обработчик события load
        req.addEventListener('load', function () {

            var response = JSON.parse(req.response); // парсим его из JSON-строки в JavaScript-объект
            // Проверяем статус-код, который прислал сервер
            // 200 — это ОК, остальные — ошибка или что-то другое

            if (response.code !== 200) {
                translate.innerHTML = 'Произошла ошибка при получении ответа от сервера:\n\n' + response.message;
                return; }

                if (response.text.length === 0) {
                    // Проверяем, найден ли перевод для данного слова
                    translate.innerHTML = 'К сожалению, перевод для данного слова не найден';
                    return;
                }

                // Если все в порядке, то отображаем перевод на странице
                translate.innerHTML = response.text.join('<br>'); // вставляем его на страницу

            });


            // Обработчик готов, можно отправлять запрос
            // Открываем соединение и отправляем
            req.open('get', url);
            req.send();

    }

});

openStart.addEventListener('click', function () {
    modalBlockStart.style.display = 'flex';
});

faTimes.addEventListener('click', function () {
    modalBlockStart.style.display = 'none';
});


fasFinish.addEventListener('click', function () {
    modalBlockFinish.style.display = 'flex';
});

faTimesFinish.addEventListener('click', function () {
    modalBlockFinish.style.display = 'none';
});
