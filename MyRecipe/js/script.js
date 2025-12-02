/**********************
 * MyRecipe - script.js
 * Данни (30 рецепти) + логика за:
 * - регистрация/вход (localStorage)
 * - welcome/recipes pages
 * - detail recipe (recipe.html?id=...)
 * - favorites (линкове към recipe.html?id=...)
 **********************/

/* ---------- DATA: 30 detailed recipes ---------- */
const RECIPES = [
  // Breakfast (6)
  { id: "b01", name: "Класически палачинки", category: "breakfast", short: "Пухкави палачинки.", time:"20 мин", servings:2, difficulty:"Лесно", image:"https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?_gl=1*u6kmmj*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODgzOTgkajYwJGwwJGgw", ingredients:["1 ч.ч. брашно","1 яйце","1 ч.ч. мляко","1 с.л. захар","1 щипка сол","1 с.л. масло"], steps:["Смесете сухите съставки.","Добавете яйцaта и млякото и бъркайте до хомогенна смес.","Печете на среден температура 1-2 мин. на страна."]},
  { id: "b02", name: "Овесена каша с плодове", category: "breakfast", short: "Здравословна каша с пресни плодове.", time:"12 мин", servings:1, difficulty:"Много лесно", image:"https://images.pexels.com/photos/90894/pexels-photo-90894.jpeg?_gl=1*g4f1j7*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODMyNTUkajU4JGwwJGgw", ingredients:["1/2 ч.ч. овесени ядки","1 ч.ч. мляко или вода","плодове по избор","1 ч.л. мед"], steps:["Сварете овесените ядки около 5-8 мин.","Добавете мед и плодове и сервирайте."]},
  { id: "b03", name: "Френски тост", category: "breakfast", short: "Хрупкав в краищата и мек отвътре.", time:"15 мин", servings:2, difficulty:"Лесно", image:"https://images.pexels.com/photos/30900620/pexels-photo-30900620.jpeg?_gl=1*w1e3b7*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODQwMjIkajU5JGwwJGgw", ingredients:["4 филии хляб","2 яйца","1/2 ч.ч. мляко","1 ч.л. ванилия","масло"], steps:["Разбийте яйцата с млякото и ванилията.","Напоете филииките и ги изпържете до златисто."]},
  { id: "b04", name: "Авокадо тост", category: "breakfast", short: "Бърза и свежа закуска.", time:"8 мин", servings:1, difficulty:"Много лесно", image:"https://images.pexels.com/photos/1656685/pexels-photo-1656685.jpeg?_gl=1*t1qqre*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODQyODAkajI5JGwwJGgw", ingredients:["1/2 авокадо","1 филия хляб","сол, пипер","лимонов сок"], steps:["Намачкайте авокадото с лимон и подправки.","Намажете върху препечен хляб и се насладете."]},
  { id: "b05", name: "Йогурт с гранола и мед", category: "breakfast", short: "Бърза и засищаща комбинация.", time:"5 мин", servings:1, difficulty:"Много лесно", image:"https://images.pexels.com/photos/17498974/pexels-photo-17498974.jpeg?_gl=1*10dzov3*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODQxMzIkajMwJGwwJGgw", ingredients:["200 г гръцко кисело мляко","50 г гранола","плодове","1 с.л. мед"], steps:["Сложете киселото мляко в съд по ваш избор, поръсете с гранола и плодове, добавете мед."]},
  { id: "b06", name: "Омлет с билки", category: "breakfast", short: "Сочно яйчено ястие, богато на аромати.", time:"10 мин", servings:1, difficulty:"Лесно", image:"https://media.istockphoto.com/id/485040276/photo/herb-omelette-with-chives-and-oregano.jpg?s=1024x1024&w=is&k=20&c=715Mx_bUObAQm5iRt0Min95_zZjeg063BUVisIt1qpQ=", ingredients:["2 яйца","пресни билки","сол, пипер","1 с.л. масло"], steps:["Разбийте яйцата, добавете нарязаните билки.","Изпечете на тиган до готовност."]},

  // Lunch (6)
  { id: "l01", name: "Крем супа от тиква", category: "lunch", short: "Кадифена супа, идеална за хладни дни.", time:"40 мин", servings:4, difficulty:"Средно", image:"https://images.pexels.com/photos/13788765/pexels-photo-13788765.jpeg?_gl=1*1et48gu*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODYxMTMkajM5JGwwJGgw", ingredients:["600 г тиква","1 лук","2 скилидки чесън","600 мл бульон","100 мл сметана","олио, сол, пипер"], steps:["Запържете лука и чесъна.","Добавете тиквата и бульона, варете 20 мин.","Пасирайте, добавете сметаната и варете до готовност."]},
  { id: "l02", name: "Салата с киноа и зеленчуци", category: "lunch", short: "Лека, но засищаща салата.", time:"25 мин", servings:2, difficulty:"Лесно", image:"https://images.pexels.com/photos/28286254/pexels-photo-28286254.jpeg?_gl=1*8sxdyp*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODQ4MDUkajQ0JGwwJGgw", ingredients:["1/2 ч.ч. киноа","краставица","чери домати","магданоз","зехтин, лимон"], steps:["Сварете киноата и след това я охладете.","Смесете с нарязаните зеленчуци и сложете подправки по ваш вкус."]},
  { id: "l03", name: "Сандвич с пиле и авокадо", category: "lunch", short: "Хрупкаво пиле + авокадо.", time:"20 мин", servings:2, difficulty:"Лесно", image:"https://images.pexels.com/photos/30925486/pexels-photo-30925486.jpeg?_gl=1*1ah7m4j*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODQ5NzQkajQ2JGwwJGgw", ingredients:["2 пилешки филета","авокадо","хляб/чабата","маруля","майонеза"], steps:["Запечете пилето и го нарежете.","Сглобете с авокадо и маруля."]},
  { id: "l04", name: "Спанак с яйца на тиган", category: "lunch", short: "Бързо и засищащо — яйца със спанак.", time:"15 мин", servings:2, difficulty:"Лесно", image:"https://images.pexels.com/photos/6275095/pexels-photo-6275095.jpeg?_gl=1*12llrzp*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODUxMzkkajQ1JGwwJGgw", ingredients:["200 г пресен спанак","2 яйца","1 скилидка чесън","олио"], steps:["Запържете чесъна, добавете спанака.","Направете вдлъбнатини и пуснете яйцата и ги сервирайте."]},
{ id: "l05", name: "Канелони с рикота и спанак", category: "lunch", short: "Вкусни ролца с кремав пълнеж.", time:"50 мин", servings:4, difficulty:"Средно", image:"https://images.pexels.com/photos/12409905/pexels-photo-12409905.jpeg?_gl=1*upx242*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODY0MzMkajQ5JGwwJGgw", ingredients:["канелони","250 г ricotta","200 г спанак","пармеzan"], steps:["Пригответе пълнежа, напълнете канелоните и печете 25-30 мин."]},
  { id: "l06", name: "Паста със сметанов сос, пиле и спанак", category: "lunch", short: "Вкусна италианска паста.", time:"30 мин", servings:2-3, difficulty:"Лесно", image:"https://images.pexels.com/photos/5531093/pexels-photo-5531093.jpeg?_gl=1*3ysvun*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODU1NzIkajUwJGwwJGgw", ingredients:["250 г паста по избор","300 г пилешко филе","200 мл течна готварска сметана","2 шепи пресен спанак","2 с.л. зехтин или масло"], steps:["Сварете пастата в подсолена вода.Пригответе пилето и добавете зеленчуците и сметаната.","Смесете пастата със соса и сервирайте."]},

  // Dinner (6)
  { id: "d01", name: "Печена сьомга с лимон", category: "dinner", short: "Прясна сьомга, фино подправена и изпечена.", time:"25 мин", servings:2, difficulty:"Лесно", image:"https://images.pexels.com/photos/842142/pexels-photo-842142.jpeg?_gl=1*a171ce*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODg1NDUkajYwJGwwJGgw", ingredients:["2 филета сьомга","1 лимон","зехтин","сол, пипер","копър"], steps:["Подправете филетата, печете 12–15 мин. на 200°C.Сервирайте с резени лимон и копър."]},
  { id: "d02", name: "Пиле терияки с ориз", category: "dinner", short: "Сладко-солено пиле в терияки сос.", time:"30 мин", servings:3, difficulty:"Лесно", image:"https://images.pexels.com/photos/5836775/pexels-photo-5836775.jpeg?_gl=1*1kv8sbc*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODg2MTkkajYwJGwwJGgw", ingredients:["500 г пилешко","терияки сос","ориз","лук","сусам"], steps:["Мариновайте пилето, запържете и сервирайте с ориз."]},
  { id: "d03", name: "Ризото с гъби", category: "dinner", short: "Кремообразно ризото с ароматни гъби.", time:"40 мин", servings:3, difficulty:"Средно", image:"https://images.pexels.com/photos/6406460/pexels-photo-6406460.jpeg?_gl=1*igs752*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODg2NjYkajEzJGwwJGgw", ingredients:["300 г ризото","200 г гъби","1 лук","бяло вино","бульон","пармезан"], steps:["Запържете лука и гъбите, добавете ризотото и виното.","Добавяйте бульон постепенно, бъркайте до крем."]},
  { id: "d04", name: "Пица Маргарита", category: "dinner", short: "Класическа пица с моцарела и босилек.", time:"1 ч", servings:2, difficulty:"Средно", image:"https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg", ingredients:["тесто за пица","домати","моцарела","босилек"], steps:["Разточете тестото, добавете сос и моцарела, печете на висока температура."]},
  { id: "d05", name: "Пълнени чушки с ориз и месо", category: "dinner", short: "Традиционно ястие, печено до съвършенство.", time:"1.5 ч", servings:6, difficulty:"Средно", image:"https://media.istockphoto.com/id/95315245/photo/colorful-stuffed-peppers-with-mince-herbs-and-rice.jpg?s=1024x1024&w=is&k=20&c=BxW9DBaBFQXQKJrEj7NApDtV7EIbdiamlASIM3p9mWg=", ingredients:["чушки","ориз","кайма","лук","подправки"], steps:["Пригответе плънката, напълнете чушките и печете 45-60 мин."]},
  { id: "d06", name: "Говеждо с червено вино", category: "dinner", short: "Нежно говеждо, бавно готвено в ароматен сос.", time:"2.5 ч", servings:4, difficulty:"Трудно", image:"https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?_gl=1*14tbyr8*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODg3MDgkajU1JGwwJGgw", ingredients:["800 г говеждо","червено вино","моркови","лук","бульон"], steps:["Запечете месото, добавете зеленчуци и вино и оставете да къкри бавно. Сервирайте с гарнитура по избор."]},

  // Main (6)
  { id: "m01", name: "Мусака", category: "main", short: "Класическа мусака с картофи и кайма.", time:"2 ч", servings:6, difficulty:"Средно", image:"https://images.pexels.com/photos/29535638/pexels-photo-29535638.jpeg?_gl=1*ny2ck0*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODk2NzYkajQ4JGwwJGgw", ingredients:["картофи","кайма","лук","бешамел","подправки"], steps:["Нарежете картофите, пригответе плънка и печете със заливка от бешамел. Сервирайте топло."]},
  { id: "m02", name: "Паста Карбонара", category: "main", short: "Кремообразна карбонара с яйце и пармезан.", time:"25 мин", servings:3, difficulty:"Лесно", image:"https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg", ingredients:["спагети","бекон","яйца","пармезан","черен пипер"], steps:["Сгответе пастата, запържете бекона и комбинирайте с яйчената смес."]},
  { id: "m03", name: "Лазаня Болонезе", category: "main", short: "Паста, сос болонезе и бешамел.", time:"1.5 ч", servings:6, difficulty:"Средно", image:"https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?_gl=1*5dh4x6*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODg4MzMkajExJGwwJGgw", ingredients:["лазаня кори","кайма","домати","бешамел","пармезан"], steps:["Пригответе болонезе и бешамел, наредете слоевете и печете около 40 мин. Сервирайте топло."]},
  { id: "m04", name: "Пиле на фурна с билки", category: "main", short: "Ароматно пиле, печено до златисто.", time:"1 ч 15 мин", servings:4, difficulty:"Лесно", image:"https://images.pexels.com/photos/4589140/pexels-photo-4589140.jpeg?_gl=1*14pfuhg*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODg4NzgkajQ5JGwwJGgw", ingredients:["цяло пиле","розмарин","чесън","лимон","зехтин"], steps:["Мариновайте и печете до готовност, полейте със соковете. Сервирайте с гарнитура по избор."]},
  { id: "m05", name: "Гъби с чесън и масло", category: "main", short: "Подходящо и като гарнитура, и като основно.", time:"20 мин", servings:2, difficulty:"Много лесно", image:"https://images.pexels.com/photos/6605639/pexels-photo-6605639.jpeg?_gl=1*1vgwj77*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODg5MzEkajYwJGwwJGgw", ingredients:["гъби","чесън","масло","магданоз"], steps:["Запържете чесъна, добавете гъбите и накрая магданоза. Сервирайте топло."]},
  { id: "m06", name: "Телешко стек с билково масло", category: "main", short: "Елегантно основно за специален повод.", time:"30 мин", servings:2, difficulty:"Средно", image:"https://images.pexels.com/photos/6378664/pexels-photo-6378664.jpeg?_gl=1*b4vw78*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODkyMTAkajUxJGwwJGgw", ingredients:["2 стекa телешко","масло","пресни билки","сол, пипер"], steps:["Подправете и изпържете стековете до желаната степен; сервирайте с билково масло."]},

  // Desserts (6)
  { id: "e01", name: "Чийзкейк", category: "dessert", short: "Кремообразен чийзкейк с бисквитена основа.", time:"1.5-2 ч", servings:8, difficulty:"Средно", image:"https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?_gl=1*xxima1*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODkyODMkajM4JGwwJGgw", ingredients:["бисквити","крема сирене","яйца","захар","ванилия"], steps:["Направете основа от бисквити, пригответе крема и печете на водна баня 50-60 мин. Сервирайте охладен."]},
  { id: "e02", name: "Шоколадов мус", category: "dessert", short: "Mус за истински шоколадови любители.", time:"30 мин (+охлаждане)", servings:4, difficulty:"Лесно", image:"https://images.pexels.com/photos/3026810/pexels-photo-3026810.jpeg?_gl=1*1dwei4u*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODkzMjckajU1JGwwJGgw", ingredients:["тъмен шоколад","яйца","сметана","захар"], steps:["Разтопете шоколада, смесете с жълтъците и внимателно добавете разбитите белтъци и сметана. Охладете няколко часа."]},
  { id: "e03", name: "Торта с ягоди", category: "dessert", short: "Нежна торта с крем и пресни ягоди.", time:"2 ч", servings:8, difficulty:"Средно", image:"https://media.istockphoto.com/id/861047048/photo/summer-objects-in-a-garden.jpg?s=1024x1024&w=is&k=20&c=Sjx_dddy85viuoCE8EnQPRlguiiSjtJwzEsoFcCuUgw=", ingredients:["блатове","сметана","ягоди","захар"], steps:["Сглобете блатовете с крем и ягоди, охладете."]},
  { id: "e04", name: "Бисквитена торта", category: "dessert", short: "Бърз торта с бисквити и плодове.", time:"20 мин", servings:6, difficulty:"Много лесно", image:"https://images.pexels.com/photos/2401561/pexels-photo-2401561.jpeg?_gl=1*a3d6so*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODkzNzYkajYkbDAkaDA.", ingredients:["бисквити","крема сирене/маскарпоне","плодове"], steps:["Наредете бисквити и крем в купа, охладете 1-2 часа. Сервирайте с плодове."]},
  { id: "e05", name: "Карамелизиран ябълков тарт", category: "dessert", short: "Класически тарт с карамелни ябълки.", time:"1 ч", servings:6, difficulty:"Средно", image:"https://images.pexels.com/photos/6148198/pexels-photo-6148198.jpeg?_gl=1*izes8r*_ga*NDAxNTY4MDE5LjE3NjQ2ODI4ODg.*_ga_8JE65Q40S6*czE3NjQ2ODI4ODckbzEkZzEkdDE3NjQ2ODk0MjckajQ3JGwwJGgw", ingredients:["блат за тарта","ябълки","захар","масло"], steps:["Наредете ябълките върху тестото, карамелизирайте и печете. Сервирайте охладен."]},
  { id: "e06", name: "Палачинки с шоколадов ганаш", category: "dessert", short: "Палачинки, залети с кремообразен шоколад.", time:"30 мин", servings:4, difficulty:"Лесно", image:"https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg", ingredients:["палачинки","тъмен шоколад","сметана"], steps:["Пригответе ганаш и полейте палачинките, сервирайте топли."]}
];

/* ---------- AUTH (users stored in localStorage) ---------- */
function getUsers(){
  return JSON.parse(localStorage.getItem('users') || '{}');
}
function saveUsers(obj){
  localStorage.setItem('users', JSON.stringify(obj));
}
function currentUser(){
  return localStorage.getItem('loggedUser') || null;
}
function registerHandler(){
  const u = document.getElementById('regUser')?.value?.trim();
  const p = document.getElementById('regPass')?.value;
  const p2 = document.getElementById('regPass2')?.value;
  if(!u || !p){ alert('Попълнете всички полета!'); return; }
  if(p !== p2){ alert('Паролите не съвпадат!'); return; }
  const users = getUsers();
  if(users[u]){ alert('Потребителското име вече е заето.'); return; }
  users[u] = { password: p, favs: [] };
  saveUsers(users);
  alert('Регистрация успешна! Моля, влезте с потребителското си име.');
  // optionally auto-login or redirect:
  // localStorage.setItem('loggedUser', u);
  // window.location.href = 'welcome.html';
}
function loginHandler(){
  const u = document.getElementById('logUser')?.value?.trim();
  const p = document.getElementById('logPass')?.value;
  if(!u || !p){ alert('Попълнете всички полета!'); return; }
  const users = getUsers();
  if(users[u] && users[u].password === p){
    localStorage.setItem('loggedUser', u);
    window.location.href = 'welcome.html';
  } else {
    alert('Грешно потребителско име или парола!');
  }
}
function logoutHandler(){
  localStorage.removeItem('loggedUser');
}

/* ---------- RECIPES PAGE ---------- */
function initRecipesPage(){
  if(!currentUser()){ window.location.href = 'index.html'; return; }
  // categories
  const categories = [...new Set(RECIPES.map(r => r.category))];
  const catList = document.getElementById('categoryList');
  catList.innerHTML = '';
  categories.forEach((c, idx) => {
    const li = document.createElement('li');
    li.textContent = prettyCategory(c);
    li.dataset.cat = c;
    if(idx === 0) li.classList.add('active');
    li.addEventListener('click', () => {
      document.querySelectorAll('#categoryList li').forEach(x => x.classList.remove('active'));
      li.classList.add('active');
      renderRecipesGrid(c);
    });
    catList.appendChild(li);
  });
  renderRecipesGrid(categories[0]);
  document.getElementById('searchInput').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const active = document.querySelector('#categoryList li.active')?.dataset?.cat;
    renderRecipesGrid(active, q);
  });
}
function prettyCategory(c){
  switch(c){
    case 'breakfast': return 'Закуска';
    case 'lunch': return 'Обяд';
    case 'dinner': return 'Вечеря';
    case 'main': return 'Основно';
    case 'dessert': return 'Десерт';
    default: return c;
  }
}
function renderRecipesGrid(category, q=''){
  const grid = document.getElementById('recipesGrid');
  if(!grid) return;
  grid.innerHTML = '';
  const filtered = RECIPES.filter(r =>
    r.category === category && (r.name.toLowerCase().includes(q) || r.short.toLowerCase().includes(q) || r.ingredients.join(' ').toLowerCase().includes(q))
  );
  if(filtered.length === 0){ grid.innerHTML = '<p class="muted">Няма намерени рецепти.</p>'; return; }
  filtered.forEach(r => {
    const card = document.createElement('div'); card.className = 'recipe-card';
    card.innerHTML = `
      <div>
        <img src="${r.image}" alt="${r.name}">
        <h3>${r.name}</h3>
        <div class="meta">${r.time} • ${r.servings} порции • ${prettyCategory(r.category)}</div>
        <div class="short">${r.short}</div>
      </div>
      <div class="action-row">
        <a class="btn" href="recipe.html?id=${encodeURIComponent(r.id)}">Преглед</a>
        <button class="btn secondary" data-id="${r.id}">Добави в любими</button>
      </div>
    `;
    card.querySelector('.btn.secondary').addEventListener('click', () => addFavoriteById(r.id));
    grid.appendChild(card);
  });
}

/* ---------- RECIPE DETAIL ---------- */
function renderRecipeDetailFromQuery(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if(!id){ document.getElementById('recipeDetail').innerHTML = '<p>Рецепта не е избрана.</p>'; return; }
  renderRecipeDetail(id);
}
function renderRecipeDetail(id){
  const r = RECIPES.find(x => x.id === id);
  if(!r){ document.getElementById('recipeDetail').innerHTML = '<p>Рецепта не е намерена.</p>'; return; }
  const detail = document.getElementById('recipeDetail');
  detail.innerHTML = `
    <header>
      <div>
        <h1>${r.name}</h1>
        <div class="meta">${r.time} • ${r.servings} порции • ${prettyCategory(r.category)} • ${r.difficulty || ''}</div>
      </div>
      <div>
        <button class="btn" id="detailFav">${isFavorite(r.id) ? '❤️ В любими' : 'Добави в любими'}</button>
      </div>
    </header>
    <img src="${r.image}" alt="${r.name}">
    <section class="section"><h4>Кратко</h4><p>${r.short}</p></section>
    <section class="section"><h4>Необходими продукти</h4><ul>${r.ingredients.map(i => `<li>${i}</li>`).join('')}</ul></section>
    <section class="section"><h4>Начин на приготвяне</h4><ol>${r.steps.map(s => `<li>${s}</li>`).join('')}</ol></section>
  `;
  document.getElementById('detailFav').addEventListener('click', () => {
    addFavoriteById(r.id);
    document.getElementById('detailFav').textContent = '❤️ В любими';
  });
}

/* ---------- FAVORITES ---------- */
function addFavoriteById(id){
  const u = currentUser();
  if(!u){ alert('Трябва да влезете.'); window.location.href='index.html'; return; }
  const users = getUsers();
  users[u] = users[u] || { password:'', favs:[] };
  if(!users[u].favs) users[u].favs = [];
  if(!users[u].favs.includes(id)){
    users[u].favs.push(id);
    saveUsers(users);
    alert('Добавено в любими!');
  } else {
    alert('Вече е в любими!');
  }
}
function isFavorite(id){
  const u = currentUser(); if(!u) return false;
  const users = getUsers(); return users[u] && users[u].favs && users[u].favs.includes(id);
}
function renderFavoritesPage(){
  const u = currentUser(); if(!u){ window.location.href='index.html'; return; }
  const users = getUsers(); const favs = users[u].favs || [];
  const listEl = document.getElementById('favList'); if(!listEl) return;
  listEl.innerHTML = '';
  if(favs.length === 0){ listEl.innerHTML = '<li>Нямате любими рецепти.</li>'; return; }
  favs.forEach(id => {
    const r = RECIPES.find(x => x.id === id);
    if(r){
      const li = document.createElement('li');
      li.innerHTML = `<a href="recipe.html?id=${encodeURIComponent(r.id)}">${r.name} <span class="meta">• ${prettyCategory(r.category)}</span></a>`;
      listEl.appendChild(li);
    }
  });
}

/* ---------- BOOTSTRAP & EXPORTS ---------- */
(function bootstrap(){
  window.registerHandler = registerHandler;
  window.loginHandler = loginHandler;
  window.logoutHandler = logoutHandler;
  window.initRecipesPage = initRecipesPage;
  window.renderRecipeDetailFromQuery = renderRecipeDetailFromQuery;
  window.renderFavoritesPage = renderFavoritesPage;
})();

function loadFavorites() {
    const container = document.getElementById('favoriteRecipes');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    container.innerHTML = '';
    favorites.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipe-info">
                <h3>${recipe.name}</h3>
                <p><strong>Съставки:</strong></p>
                <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                <p><strong>Начин на приготвяне:</strong></p>
                <ol>${recipe.steps.map(s => `<li>${s}</li>`).join('')}</ol>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- Регистрация и вход ---
document.getElementById('registerForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    localStorage.setItem('user', JSON.stringify({username, password}));
    alert('Регистрацията е успешна!');
});

document.getElementById('loginForm')?.addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.username === username && user.password === password){
        window.location.href = 'home.html';
    } else {
        alert('Грешно потребителско име или парола!');
    }
});

// --- Ако сме на favorites.html ---
if(document.getElementById('favoriteRecipes')){
    loadFavorites();
}
