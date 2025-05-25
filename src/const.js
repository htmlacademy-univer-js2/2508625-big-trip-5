const WAYPPOINTS_COUNT = 10;
const DEFAULT_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.sssZ';
const SHORT_DEFAULT_FORMAT = 'YYYY-MM-DD';
const SHORT_DATE_FORMAT = 'MMM D';
const FULL_DATE_FORMAT = 'DD/MM/YY';
const TIME_FORMAT = 'HH:mm';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva'];

const DESCRIPTIONS = [
  'Уютные улочки старого города хранят атмосферу средневековья.',
  'Панорамный вид с вершины холма захватывает дух в любое время года.',
  'Исторический замок возвышается над рекой, словно ожившая легенда.',
  'Шумный рынок манит ароматами специй, кофе и свежей выпечки.',
  'Пешеходная набережная полна жизни и уличных музыкантов.',
  'Старинный кафедральный собор поражает своими витражами и тишиной внутри.',
  'Затенённый парк с фонтанами предлагает отдых от городской суеты.',
  'Местный музей рассказывает историю края через интерактивные экспозиции.',
  'Каменные мостовые ведут к уютным кафе и арт-галереям.',
  'Утренний туман придаёт озеру загадочность и сказочную атмосферу.',
];

const OFFER_TITLES = [
  'Order Uber',
  'Add luggage',
  'Switch to comfort',
  'Rent a car',
  'Add breakfast',
  'Book tickets',
  'Lunch in city',
];

const filterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const FormMode = {
  EDITING: 'editing',
  ADDING: 'adding',
};

export {TIME_FORMAT, FULL_DATE_FORMAT, SHORT_DATE_FORMAT, DEFAULT_DATE_FORMAT, SHORT_DEFAULT_FORMAT, WAYPPOINTS_COUNT, POINT_TYPES, CITIES, DESCRIPTIONS, OFFER_TITLES, filterTypes, Mode, SortType, FormMode};
