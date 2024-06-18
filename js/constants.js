/* RESOURCES */
const DOWNLOAD_ICON = "assets/icons/file.svg";
const unit1ListItems = [
    {
        'href': 'https://moodle.exa.unicen.edu.ar/mod/page/view.php?id=68731',
        'description': 'Introducción a HTML y CSS'
    },
    {
        'href': 'https://moodle.exa.unicen.edu.ar/mod/page/view.php?id=68746',
        'description': 'Sitio web completo'
    },
    {
        'href': 'https://moodle.exa.unicen.edu.ar/mod/page/view.php?id=68736',
        'description': 'Layouts & Box Model'
    },
    {
        'href': 'https://moodle.exa.unicen.edu.ar/mod/page/view.php?id=68741',
        'description': 'Tablas y Formularios'
    },
    {
        'href': 'https://moodle.exa.unicen.edu.ar/mod/page/view.php?id=68751',
        'description': 'JavaScript#1'
    },
    {
        'href': 'https://moodle.exa.unicen.edu.ar/mod/page/view.php?id=68757',
        'description': 'CSS Parte 2 (Herencia y Cascada)'
    },
    {
        'href': 'https://moodle.exa.unicen.edu.ar/mod/page/view.php?id=68762',
        'description': 'Formularios con JS'
    }
]
const unit2ListItems = [
    {
        'href': 'https://moodle.exa.unicen.edu.ar/mod/page/view.php?id=68776',
        'description': 'Javascript #2 Parte I'
    },
    {
        'href': 'https://moodle.exa.unicen.edu.ar/mod/page/view.php?id=68781',
        'description': 'Semántica Web'
    },
    {
        'href': 'https://moodle.exa.unicen.edu.ar/mod/page/view.php?id=68786',
        'description': 'Diseño Responsive'
    },
    {
        'href': 'https://moodle.exa.unicen.edu.ar/mod/page/view.php?id=68792',
        'description': 'Javascript #3 Parte I'
    },
    {
        'href': 'https://moodle.exa.unicen.edu.ar/mod/page/view.php?id=68798',
        'description': 'HTML5 y CSS3'
    }
]

/* STUDENTS */
const STUDENT_ATTRIBUTES = ['dni', 'name', 'lastname', 'comission', 'mail'];
const TABLE_COLUMNS = STUDENT_ATTRIBUTES.length;
const MAIL_COLUMN = STUDENT_ATTRIBUTES.indexOf('mail');

/* CONTACT */
const CAPTCHA_LENGTH = 8;
const CAPTCHA_OPTIONS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789";