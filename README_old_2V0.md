﻿## Инструкция для скрипта «VkMsgExport v2.0»

(Ссылка на загрузку находится внизу этой страницы)

### Общие сведения

- Скрипт работает в браузере (Firefox, Opera, Chrome, любые нормальные версии, в которых открывается сам вКонтакте). Так как в мобильных браузерах обычно отсутствует «панель разработки» с консолью javascript, вам понадобится desktop-версия.
- С помощью этого скипта можно выкачать с сервера вКонтакте ваши личные сообщения и чаты, чтобы сохранить их на компьютере.
- Вы получите JSON-базу, в которой будет всё необходимое для корректного отображения всех ваших диалогов. Даже если вам не понравится тот печатный формат, в который их выведет этот скрипт, у вас всегда будут «оригиналы», которые в будущем можно будет отобразить как угодно.

### Зачем это нужно

- Если вас беспокоит сохранность информации в ваших диалогах и беседах вКонтакте, то сохранить их локально для себя – это очень хорошая мысль. Данный скрипт автоматизирует этот процесс.
- Также, согласно официальному посту – https://vk.com/dev/messages_api – прямой доступ к личным сообщениям через API будет закрыт 15 февраля 2019 года, и есть вероятность, что такой простой способ сохранения чатов перестанет работать вообще.

### Что НЕ делает эта программа

- Скрипт не сделает ничего без вашего указания. Он не производит никаких автономных действий, вы полностью контролируете процесс.
- Скрипт никуда не отправляет скачанные данные. Весь массив сообщений храниться только в текущей сессии в памяти javascript, вы сами должны будете сохранить базу в локальный файл на компьютере.
- Скрипт ничего не делает с вашим аккаунтом, только скачивает сообщения, которые вы укажете. Процесс всегда можно отменить, а проследить за производимыми запросами при желании не составит никакого труда (например через «инструменты разработчика» в браузере).
- Скрипт не потребует ввода пароля от вашего профиля вКонтакте. После скачивания базы сообщений, вы сможете работать с ней уже локально, без обращения к серверам вКонтакте.
- Скрипт умеет выкачивать ТОЛЬКО личные сообщения, и только из текущего аккаунта, в который вы можете залогиниться. Он не сохраняет стены, сообщества, обсуждения, комментарии, и так далее. Медиа-вложения и фотографии в сообщениях – сохраняются как ссылки на сервера вКонтакте; на данный момент нет функционала для полностью автоматического их скачивания.

### Как запустить скрипт

- Залогиньтесь вКонтакте через тот бразуер, через который будете сохранять сообщения через этот скрипт. Например, перейдите на «https://m.vk.com/mail», чтобы сайт попросил ввести пароль, если вы ещё не вошли.
- Откройте файл «VkMsgExport2V0.js» в любом текстовом редакторе, откуда можно будет скопировать текст. Например, откройте Блокнот и перетащите его туда (либо через «Открыть» – и потом в «Тип файла» выберите «Все файлы (*.*)» и найдите скрипт). Или откройте в самом браузере (перетащите в файл адресную строку, либо откройте версию скрипта прямо по ссылке).
- Выделите весь текст скрипта и скопируйте в буфер обмена (Ctrl+A и Ctrl+C).
- Откройте «консоль разработчика» в браузере – обычно комбинациями Ctrl+Shift+K, или Ctrl+Shift+J, либо F12, также можно через меню. Найдите там текстовое поле, куда можно писать javascript, обычно это консоль javascript-ошибок.
- Вставьте скрипт туда и нажмите Enter. Внимание, некоторые браузеры могут не позволить вам вставлять в консоль «потенциально небезопасный» код, ради защиты от мошенничества. Вам придётся найти способ, как разрешить вставку скриптов в консоль (обычно все инструкции будут на экране).
- Скрипт, скорее всего, выведет информационное окошко, с сообщением о том, что текущий домен (адрес) страницы – это не «vk.com». По стандарту, браузеры блокируют любые автоматические запросы, если у текущей страницы будет другой домен (то есть, запросы работают только в пределах одного и того же сайта). Нажмите «ОК», чтобы переадресовать браузер на « https://vk.com/404 »; если же вы нажмёте «Отмена», то скрипт включится на текущей странице, но скачивание сообщений работать не будет (однако пользоваться ранее скачанной базой останется возможно).
- После переадресации на vk.com/404 (да, это будет страница со страшной ошибкой 404, так и должно быть) вставьте и выполните этот же самый скрипт ещё раз. Находясь на законной странице вКонтакте, он сможет честно совершать автоматические запросы.
- Если вы видите интерфейс скрипта с полями и кнопочками (на английском) – значит вам удалось успешно его запустить.

### Как по-быстрому воспользоваться скриптом

- Если у вас не очень много диалогов и сообщений (например, около сотни диалогов и примерно несколько десятков тысяч сообщений в них, суммарно) – то работа со скриптом будет прямолинейной.
- Нажмите кнопку «**Login**» (рядом с «*Account:*»), чтобы убедиться, что вы залогинены вКонтакте. Серое окно операции должно исчезнуть само, после чего вы увидите вверху вместо «???» – имя пользователя, под которым вошли (подчёркнутый текст).
- Нажмите кнопку «**Fetch**» (рядом с «*List:*») – это скачает «названия» всех имеющихся у вас диалогов (пользователи и чаты). В сером окне будет показано текущее скачиваемое количество, окно вскоре исчезнет.
- Напротив «**Current:**» вы увидите количество имеющихся у вас диалогов (курсивом), а список снизу – будет заполнен именами и названиями. Сейчас скачан только список ваших диалогов, но не сами сообщения. Нажмите кнопку «**All**» (напротив «*Change:*»), чтобы выделить все строки в списке.
- Нажмите кнопку «**Download**» (напротив «*Selected:*») – это запустит фоновый процесс скачивания всех ваших сообщений из всех ваших диалогов. Вы увидите прогресс в сером окне, которое будет автоматически закрыто по завершению.
- Сообщения скачаны, но не сохранены. Нажмите кнопку «**Export**» (напротив «*Messages:*», сверху). После этого верхнее текстовое поле станет серым, показывая размер всей базы в байтах.
- Нажмите кнопку «**Store**» (напротив «*Buffer:*») – появится окошко сохранения файла. Предложенное имя файла и тип будут странными, но на деле – это всего лишь текстовый документ в JSON формате, поэтому можете написать что-нибудь вроде «сообщения.txt» и сохранить на свой компьютер.
- Это – база всех ваших сообщений, и она понадобится вам, когда  вы захотите «интерпретировать» их, в частности, через этот же скрипт. Читайте следующую часть:

### Превращение в читаемый формат

- Если у вас есть ранее сохранённая база сообщений – откройте её по кнопке рядом с «**Open:**» (напротив «*Buffer:*»); также, можете напрямую перетащить файл базы прямо туда.
- Нажмите кнопку «**Import**» (рядом с «*Messages:*»). Если же вы и так только что скачали все сообщения, то повторно базу открывать уже не нужно.
- Выделите в списке внизу те диалоги, которые хотите посмотреть или сохранить в читабельном формате.
- Нажмите кнопку «**Txt**» (напротив «*Selected:*»), или любую другую справа от неё (на данный момент, там только эта Txt).
- Поле сверху станет серым. Нажмите кнопку «**Store**» (напротив «*Buffer:*»), чтобы сохранить интерпретированные сообщения в файл, либо – кнопку «**Show**» (там же), чтобы отобразить текст прямо в этом поле (но делайте так только на беседах с не очень большим числом сообщений, иначе браузер может зависнуть) – тогда вы сможете их скопировать напрямую.
- Откройте получившийся файл текстовым редактором или браузером. Если вы выделили несколько конференций, то все они будут в одном файле друг за другом.

### Полная документация интерфейса

- Программа работает в один логический поток. Когда возникают асинхронные операции, экран блокируется серым окном-заглушкой, которое показывает текущую операцию и её статус. Нажатием кнопки «**Abort**», операцию всегда можно прервать и вернуться в основной интерфейс. Сетевую активность вызывают кнопки Login, Fetch, Count, Download.
- Кнопка «**Login**» проверяет текущий статус авторизации. Однако, вКонтакте может вскоре сбросить cookie-доступа, требуя от браузера передать дополнительный запрос на login.vk.com, который будет запущен этим скриптом в невидимом фрейме. По большому счёту, нажатие кнопки Login не требуется, поскольку при любой другой сетевой операции, если сервер вернёт ошибку – то скрипт сам попробует вызвать прохождение авторизации, как если бы Login был нажат принудительно. Имена пользователей чаще всего отображаются в формате «Имя Фамилия (Юзернейм)», согласно информации из профиля. Также, каждый пользователь имеет свой глобальный числовой «id», он тоже указывается рядом.
- Текстовое поле под словом «*Buffer:*» – это буфер для сохранения и загрузки данных. Некоторые действия (а именно: Export, Save, Raw, Txt) пишут в это поле, а другие (Import, Load) – читают из него. Так как реальное отображение большого объёма данных в текстовом поле создаёт нагрузку на браузер, скрипт при выводе в него информации – скрывает данные за надписью «`<размер>`», а поле блокируется. Чтобы всё равно отобразить скрытую информацию в этом поле, нажмите «**Show**» (фокус будет в поле, можете сразу копировать). Чтобы сохранить содержимое поля в файл (скрытое или явное) – нажмите «**Store**» (желательно добавить расширение .txt в конец имени файла). Чтобы очистить поле (или освободить память, когда данные скрыты) – нажмите «**Free**». А чтобы вставить в поле текст напрямую из файла – откройте его по кнопке рядом с «**Open:**», или перетащите файл прямо туда (окно будет заблокировано при чтении большого файла).
- Справа от «*Messages:*» выводится общее количество сообщений, сейчас загруженных в память javascript. Кнопка «**Export**» запишет их как JSON-строку в поле-буфер, которая будет являться их представлением (формат начала иерархии – свой, но далее в объекте будет по сути то, что вернулось от сервера вКонтакте). Кнопка «**Import**» – считает ранее сохранённую базу сообщений из поля-буфера, которая добавляется к тому, что уже есть в памяти (но заменяя текущие диалоги с теми же индексами-id). Это должен быть валидный JSON в том же формате. Кнопка «**Forget**» удаляет все сообщения из памяти (но не стирает список диалогов).
- Снизу от «*List:*» выводится общее количество диалогов (названий конференций), которое сейчас есть в памяти в загруженном списке. В скобках указано более детально, сколько из них являются диалогами с пользователями, чатами или группами. В них засчитываются и такие диалогов, которые появились из-за загруженных сообщений, но отсутствуют в самом списке. Кнопка «**Fetch**» начинает загрузку списка диалогов пользователя, по 80 штук за раз (промежуточный результат не сохраняется, операция должна целиком завершится успехом). Кнопка «**Save**» сохранит список диалогов в поле-буфер, это нужно, чтобы его не пришлось перекачивать в следующий раз (если вы планируете продолжить скачку сообщений), поэтому сохраните его в отдельный файл (не перепутайте с базой самих сообщений). Кнопка «**Load**» – загружает ранее сохранённый список диалогов из поля-буфера. Кнопка «**Clear**» удаляет список диалогов из памяти (однако, если у вас были сохранённые сообщения – то они в нижнем выделяемом списке ещё останутся).
- Снизу от «*Selected:*» есть readonly-поле, в которое динамически выводятся идентификаторы тех диалогов, которые сейчас выделены в нижнем списке. Вот какие действия можно произвести с ними: кнопка «**Count**» – подсчёт количества сообщений в выделенных диалогах (это нужно для того, чтобы узнать «размер» диалога, при этом не запрашивая скачивание всех сообщений в нём – чтобы потом можно было сортировать по объёму), «**Download**» – запрашивает скачивание сообщений из выделенных диалогов, по 100 за раз, начиная с самых старых сообщений, но сами диалоги пойдут в своём текущем отсортированном порядке (при этом, «количество» сообщений в каждом диалоге сразу же становится известно, даже без «Count»), «**Raw**» – сохранить в поле-буфер выделенные диалоги в исходном JSON формате, пригодном для чтения по «**Import**» впоследствии (отличие от «Export» в том, что тут диалоги окажутся на разных строчках выходного документа), «**Txt**» – вывести в поле-буфер сообщения из выделенных диалогов в читаемом текстовом формате. - Снизу от «*Change:*» находится список всех загруженных диалогов пользователя. Это HTML `<Select>`, строки в нём можно выделять мышкой, перетаскивать-красить (или зажимать Shift), либо щёлкать с удержанием Ctrl – чтобы выбрать только нужные. Кнопки справа помогут с быстрым выделением: «**All**» выделит всё, «**Cancel**» снимет выделение, а «**Invert**» обратит его (выделенными станут только те, которые выделены не были).
- Справа от «*Sort:*» находятся кнопки, управляющие сортировкой списка. Каждая строка начинается с чисел «загружено/всего» (и с «-», если этот диалог порождён загруженными сообщениями, а не настоящим списком диалогов пользователя), показывающие количество скачанных сообщений (сейчас в памяти) и общее количество сообщений в диалоге (кешировано от последнего сделанного «Download» или «Count»; изначально «0/0», то есть неизвестно при первой закачке списка). Сами названия для конференций заключены в квадратные скобки (с указанием количества участников в них после скобок), а диалоги с группами (то есть из «отправить сообщение странице» в смысле, группе-сообществу) – в фигурные. Кнопка «**Time**» сортирует список по времени последних сообщений в диалогах (по умолчанию), а кнопка «**Size**» – по количеству сообщений в них (если известно). Кнопка «**Type**» сначала разбивает диалоги по категориям (люди, чаты, группы), не меняя текущую сортировку (время/размер) внутри категорий. Повторное нажатие любой из кнопок делает порядок своей сортировки обратным.
- Функции API, к которым обращается скрипт: для получения своего имени пользователя (проверка авторизации) – https://vk.com/dev/account.getInfo , для получения списка диалогов – https://vk.com/dev/messages.getConversations , для выкачивания сообщений – https://vk.com/dev/messages.getHistory . Больше никакие методы не применяются, и никаких других запросов не совершается (кроме открытия « https://vk.com/dev/methods » во фрейме, чтобы вКонтакте обработал авторизацию).
- Формат схемы JSON: для диалогов – «`{"dialogs":{"<u_id>":<conversation>,…},"users":{"<u_id>":<user>,…}}`», где `<conversation>` это https://vk.com/dev/objects/conversation (с добавленным полем «_count» – количество сообщений в беседе), `<user>` – это https://vk.com/dev/objects/user , а их id для страниц сообществ даны сразу отрицательными (как ключи объекта); для сообщений – «`{"<u_id>":{"messages":{"<m_id>":<message>,…},"users":{"u_id":<user>,…},"dialog":<conversation>},…}`», где `<message>` это https://vk.com/dev/objects/message , но в dialog добавлено и «_count», и актуальное «last_message.date» (кстати, вернувшийся объект last_message целиком записывается в каждый диалог при скачке списка).

### Когда у вас слишком много сообщений

- Скачать все диалоги, скорее всего, не получится: браузеру не хватит оперативной памяти (при сохранении в файл объём информации утраивается, из-за особенностей используемого скриптом метода сохранения – наиболее простого и универсального). Желательно заранее закрыть другие окна и вкладки в браузере.
- Для начала, достаньте список диалогов (по «**Fetch**»), выделите все, и нажмите кнопку «**Count**» (напротив «*Selected:*»). Дождитесь окончания подсчёта (если что, его можно продолжить, в следующий раз выделив только те диалоги, у которых «0/0»).
- Сохраните список диалогов («**Save**» напротив «*List:*», и дальше Store в отдельный файл), он вам ещё может понадобиться, тем более что в нём теперь есть актуальное число сообщений в каждой беседе.
- Отсортируйте диалоги так, чтобы их потом было логично сохранить – например по типу (скажем, только чаты) или по размеру (хранить отдельно все маленькие, и по штучно – большие), ну или по дате (старые отдельно, новые отдельно).
- Выделите часть своих диалогов, которую желаете скачать за первый раз, и нажмите «**Download**» (напротив «*Selected:*»). Когда они скачаются, вы сохраните их отдельно от остальных.
- Для этого нажмите либо «**Export**» (напротив «*Messages:*»), либо «**Raw**» (напротив «*Selected:*») когда эти диалоги всё ещё выделены. Сделайте «**Store**» (напротив «*Buffer:*») в новый файл, дав ему понятное имя. Если вам сразу нужны и текстовые версии, повторите и с «**Txt**».
- Нажмите «**Forget**» (напротив «*Messages:*»), чтобы удалить эти сообщения из памяти браузера (технически, в «Диспетчере задач» занятая память может и не уменьшится, но браузер начнёт явно меньше тормозить).
- Если вы хотите продолжить скачивание когда-нибудь в следующий раз – то потом вам придётся предварительно загрузить тот сохранённый список диалогов через «**Open**» (напротив «*Buffer:*») и «**Load**» (напротив «*List:*»).
- Теперь выделите те диалоги, которые вы оставили в прошлый раз (правда они никак не отмечены), и сделайте их скачивание и сохранение. Альтернативно, чтобы не запутаться, вы могли бы изначально не делать «Count», тогда после удаления сообщений из памяти на соответствующих диалогах счётчики бы были ненулевые. (Также, можете очистить список по «**Clear**», скачать его заново с нулями, а потом импортировать и тут же удалять все ранее скачанные базы сообщений – тогда по счётчикам в списке вы быстро найдёте ещё нетронутые).
- Чтобы «докачать» сообщения, когда у вас появятся новые – сначала обновите список диалогов, загрузите вашу прошлую базу соответствующих сообщений, а потом просто возобновите закачку по ним. И если вся база в одном файле – то докачивать достаточно только самые свежие диалоги (ориентируясь либо интуитивно, либо по повторному «Count»).

### Возникающие во время работы ошибки

- Скрипт довольно стабилен, и проблем возникать не должно. При пропадании интернета вы получите «*login failed*». Чтобы докачать сорвавшиеся сообщения, просто запустите повторную закачку – скрипт продолжит с тех сообщений, которые ещё не скачались.
- Если вы получаете «*Wrong JSON object!*», значит вы, скорее всего, попытались открыть через «**Load**» базу скачанных сообщений (а надо было через «**Import**»), или наоборот, сделали Import на скачанном списке диалогов, а надо было Load. Если вы видите «*JSON parse error!*», значит вы открываете вообще не тот файл, например – выгруженные в читабельный формат сообщения (по «**Txt**»), ведь их уже нельзя загрузить обратно.
- У вас не получится «открыть» сохранённый скриптом файл, если это чистый список диалогов или база сообщений – потому что это объект в формате JSON, просто перечисление полей и значений. Чтобы получить свою переписку в читаемом формате, выгрузите её через «**Txt**», и при сохранении файла (по «**Store**») допишите расширение .txt в имя, чтобы файл определялся системой как текстовый.
- Во время авторизации по «Login» (или автоматической в процессе загрузки диалогов и сообщений) в консоли браузера может появиться ошибка наподобие «`Load denied by X-Frame-Options: https://vk.com/dev.php?method=methods does not permit framing`», либо «`Refused to display 'https://vk.com/dev/methods' in a frame because it set 'X-Frame-Options' to 'deny'`», или даже «`XMLHttpRequest cannot load https://login.vk.com/... No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://vk.com' is therefore not allowed access`» – это нормально, авторизация отработала как надо, просто документ в невидимом фрейме не признаётся сервером вКонтакте (и всё равно больше никак не используется скриптом). Тем не менее, других ошибок в консоли появляться не должно (ну, ещё есть предупреждение «`Resource interpreted as Document but transferred with MIME type application/octet-stream`» при сохранении файла, это тоже не страшно).
- Так как это неофициальный скрипт, который никак не связан с владельцами вКонтакте, он в любой момент может перестать работать (если на стороне сервера будет что-то случайно или специально изменено). Однако, уже скачанные ваши сообщения – останутся с вами (и, скорее всего, любые ссылки на изображения/фотографии в них – продолжат открываться), поэтому на всякий случай лучше выкачайте себе всю свою личную переписку, пока этот скрипт всё ещё работает.

### Доверие к этому скрипту и его автору

- **ВНИМАНИЕ: поскольку подобного рода скрипт подразумевает некоторую степень доверия к его автору (даже несмотря на то, что исходный код открыт) – прежде чем использовать его, убедитесь что у вас на руках НАСТОЯЩАЯ копия от оригинального автора.** На данный момент, основной дислокацией скрипта VkMsgExport является этот репозиторий на GitHub: https://github.com/klimaleksus/VkMsgExport , а также зеркало списка версий вот по этой ссылке: http://klimaleksus.narod.ru/Files/V/VkMsgExport.txt?2.0 – таким образом, если вы получили этот скрипт «от друга», то для вас крайне желательно перекачать его из доверенного источника, чтобы быть уверенными в том, что ваша копия скрипта никем не изменена. Вообще говоря, этот скрипт МОЖНО модифицировать так, чтобы он СОВЕРШАЛ вредоносные действия с вашим аккаунтом, начиная от удаления или сливания «налево» ваших сообщений, и заканчивая рассылкой спама или вирусов вашим друзьям от вашего имени (вплоть до похищения у вас администраторских прав на группы, которыми вы владеете) – вы должны понимать, что добровольно отдаёте сторонней программе полное управление своей учётной записью. При всём этом, любые вредоносные действия подменённая программа сможет совершать в фоне, якобы иммитируя свой оригинальный внешний вид и ожидаемое поведение. Следите, чтобы вам не подсунули троянского коня.
- Если вы – разработчик вКонтакте, который решил положить конец подобному недобросовестному использованию вашего API, и желаете намеренно сломать работу скрипта, чтобы он больше не смог злоупотреблять демонстрационным режимом – когда сделаете это, не забудьте сами добавить на сайт официальную возможность каждому скачать свою переписку (и я сейчас отнюдь не про GDPR), выборочно и удобно. Пожалуйста.

# СКАЧАТЬ

https://github.com/klimaleksus/VkMsgExport/raw/master/VkMsgExport2V0.js