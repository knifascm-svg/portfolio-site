# Контекст проекта — портфолио Никиты Семёнова

Файл для продолжения работы в новом AI-диалоге без истории переписки.  
Правила проекта: `.cursor/rules/project-workflow.mdc`

**Репозиторий:** https://github.com/knifascm-svg/portfolio-site  
**Figma:** https://www.figma.com/design/X8byg7NjjIN8q2YqIihXn2/

---

## 1. Что мы делаем

Интерактивное **портфолио в формате чата** (как переписка с ботом).

- Слева — белые bubble «от дизайнера»
- Справа — тёмные bubble «от пользователя» (десктоп `#373E40`, мобилка `#1890FF`)
- Контент в `.chat__rest` раскрывается **пошагово** с анимациями

**Три отдельные страницы** — файлы не смешивать:

| Страница | Файлы |
|----------|--------|
| Портфолио-чат | `index.html`, `styles.css`, `hero-sequence.js` |
| Корзина UWS | `cart.html`, `cart.css`, `cart.js` |
| Календарь UWS | `calendar.html`, `calendar.css`, `calendar.js` |

Ключевые фреймы Figma: **4658-212920** (desktop), **4684-1635424** (mobile ~393px), **4680-1327165** (hover composer).

---

## 2. Какой стек используем

| Что | Зачем |
|-----|--------|
| HTML / CSS / JS | Вёрстка, стили, сценарий чата |
| PT Sans | Google Fonts — портфолио |
| Open Sans | Google Fonts — корзина, календарь |
| Яндекс.Метрика | Счётчик **109476161** на всех страницах |
| Локальный сервер | Просмотр без сборщика |

**Нет** npm, bundler, React/Next/Tailwind — **не мигрировать** без явной просьбы.

```bash
cd "/Users/nikitasemenov/Documents/coursor test"
python3 -m http.server 8080
```

- http://localhost:8080/ — портфолио  
- http://localhost:8080/cart.html  
- http://localhost:8080/calendar.html  

---

## 3. Какие файлы и компоненты уже созданы

### Портфолио

| Файл | Роль |
|------|------|
| `index.html` | Чат, 5 кейсов, composer, Метрика, favicon |
| `styles.css` | Стили, анимации, адаптив `@media (max-width: 720px)` |
| `hero-sequence.js` | Hero: typing → ответ → поочерёдный `.chat__rest` |

### Assets (`assets/`)

| Файл | Роль |
|------|------|
| `favicon.png` | Иконка вкладки (512×512) |
| `profile.png` | Фото в intro |
| `case-lm-pricer.png` | Кейс #1 — прайсчекер (526×306) |
| `case-uws.png`, `uws-logo.svg` | Кейс #2 UWS |
| `case-lm-case3.png`, `logo.svg`, `line.svg` | Кейс #3 LM — страница товара |
| `case-lm-print.png`, `logo-lm-alt.svg` | Кейс #4 LM — ценники |
| `case-gethotel.png`, `logo-gethotel.svg` | Кейс #5 Gethotel |
| `paperclip.svg`, `send.svg`, `send-hover.svg` | Composer |

**Не в проекте (удалено):** `assets/slider/`, `cursor-sequence.js` — эффект курсора не используется.  
**Лишнее для деплоя:** `assets/case.png` (старая картинка, в HTML не подключена), `assets/typing-status.lottie` (не используется).

### Блоки `index.html`

| Блок | Описание |
|------|----------|
| `.block--intro` | Фото, имя, роль |
| `.typing-indicator` | Typing → «Разбираю…» (один bubble, не исчезает) |
| `.hero__response-extra` | Достижения после ответа |
| `.chat__rest` | Задачи, кейсы, процесс, статьи, финал |
| `.composer` | Ссылка на Telegram + цель Метрики `click_apply` |

### Кейсы (5 штук)

| # | Класс | Заголовок / особенности |
|---|--------|-------------------------|
| 1 | `.case-card--lm-pricer` | «Запуск прайсчекера…» — **тексты пока заглушка**; hero 376px; скрин 526×306; лого 20px, зазор до скрина 20px |
| 2 | `.case-card--uws` | Только hero (зелёный), **без body**; лого `rotate(180deg) scaleX(-1)`; 0px до скрина |
| 3 | `.case-card--lm-case3` | «Увеличил привлекательность цены на 43%» — финальные тексты; padding 4px; radius 4px; линия на всю ширину |
| 4 | `.case-card--lm-print` | «Ускорил создание проектных ценников в 12 раз»; divider; 0px лого–скрин; 10px линия–текст |
| 5 | `.case-card--gethotel` | Конверсия бронирования +97%; radius `4px 4px 12px 4px`; `.case-card__stat-range` для «с 1,78% до 3,5%» |

### Состояния `<body>`

```
hero-ready → hero-typing → hero-replied → chat-complete
```

Появление: `.chat-reveal` → `.is-revealed` → `.is-visible`.

### Корзина и календарь

- **Корзина:** вёрстка 1440px, карусели (`cart.js`), `assets/cart/*`
- **Календарь:** прототип с переключением Г/М/Д (`calendar.js`), не связан с портфолио

---

## 4. Что уже готово

- Полный сценарий hero + поочерёдный показ чата (`hero-sequence.js`)
- Адаптив портфолио (≤720px)
- 5 кейсов свёрстаны; **#3, #4, #5** — актуальные тексты и визуал; **#1** — скрин из Figma, тексты заглушка; **#2** — без текстового body
- Composer → https://t.me/no_ux_no_money , hover, цель `click_apply`
- 5 статей dsgners.ru + ссылка mentory.yonote.ru
- Неразрывные пробелы в русских текстах (короткие предлоги/союзы)
- Favicon на всех страницах
- Метрика на всех страницах
- Корзина и календарь открываются отдельно
- Git: ветка `main`, remote `origin` → GitHub (push с машины пользователя)

### Тайминги hero

```js
TYPING_START_DELAY_MS = 350
MIN_TYPING_MS = 2500
REST_AFTER_ACHIEVEMENTS_MS = 400
BUBBLE_GAP_MS = 460
SHELL_EXPAND_MS = 720
```

### Токены

| Токен | Значение |
|-------|----------|
| Фон | `#EBEBEB` |
| Bubble справа (desktop) | `#373E40` |
| Bubble справа (mobile) | `#1890FF` |
| Ссылки | `#1890FF` |
| Ширина чата | 640px (`--chat-width` 558px у кейсов) |

---

## 5. Что важно не сломать

1. **Typing-bubble не исчезает** — «Разбираю…» внутри `.typing-indicator__shell`.
2. **Не снимать `hero-typing` при `hero-replied`**.
3. Текст «Разбираю…» — `.is-text-visible` **после** расширения shell (720ms).
4. Bubble'ы — только opacity, не `display:none` на целых секциях.
5. **Composer** — `<a>`, не `<input>`; цель `ym(109476161,'reachGoal','click_apply')` на `.composer__inner`.
6. Задача про `index.html` → не трогать `cart.*` / `calendar.*` без причины (и наоборот).
7. У кейсов свои модификаторы (`--lm-pricer`, `--lm-case3`, `--uws`, `--lm-print`, `--gethotel`) — не ломать общий `.case-card` для всех.

---

## 6. Правила по стилю и архитектуре

- **Маленькими шагами** — один блок / одна правка
- **Порядок:** вёрстка → адаптив → анимации
- **Сверяться с Figma** — указывать `node-id`
- **Минимальный diff** — не переписывать работающее
- **Без новых файлов** без объяснения зачем
- Пользователь — **дизайнер**: простой язык, что проверить в браузере
- CSS: переменные в `:root`, адаптив в конце `styles.css`
- Типографика: неразрывные пробелы после коротких русских слов (в, и, на, до, из, не, …) — символ U+00A0, не `&nbsp;` в тексте

---

## 7. Что делать дальше

1. **Кейс #1** — финальные тексты (сейчас заглушка прайсчекера)
2. **Кейс #2 UWS** — body-текст и контент, если появится в Figma
3. **Мобилка** — сверить все 5 кейсов с Figma `4684-1635424`
4. **Деплой** — GitHub Pages / Netlify; залить `assets/` (без slider); проверить цель `click_apply` на боевом URL
5. Опционально: удалить `assets/case.png`, `typing-status.lottie`; опечатка в кейсе #5: «неочивидный» → «неочевидный»
6. Полировка: автоскролл при новых bubble'ах

---

## Быстрый старт для нового диалога

> Читай `PROJECT_CONTEXT.md` и `.cursor/rules/project-workflow.mdc`.  
> Портфолио-чат готов: анимации, адаптив, 5 кейсов, Метрика, favicon, Telegram.  
> Задача: [опиши]. Figma: [ссылка с node-id].

---

*Обновлено: май 2026*
