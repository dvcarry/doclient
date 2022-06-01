export const taskFilter = ['все', "задача", "проект", "привычка", "другое"]

export const RELAX_FOR_HOUR = 10

export const START_TIME_IN_MINUTES = 480

export const OPTIONS = {
    type: [
        { value: 'задача', label: 'Задача' },
        { value: 'привычка', label: 'Привычка' }
    ],
    balance: [
        { value: 'работа', label: 'Работа' },
        { value: 'проект', label: 'Проект' },
        { value: 'развитие', label: 'Развитие' },
        { value: 'семья', label: 'Семья' },
        { value: 'здоровье', label: 'Здоровье' },
    ],
    period: [
        { value: 15, label: 15 },
        { value: 30, label: 30 },
        { value: 45, label: 45 },
        { value: 60, label: 60 },
        { value: 90, label: 90 },
    ],
    plan: [
        { value: 'today', label: 'today' },
        { value: 'inbox', label: 'inbox' },
        { value: 'upcoming', label: 'upcoming' },
        { value: 'later', label: 'later' },
    ]
}

export const CURRENT_TASK = {
    id: 0,
    name: '',
    type: 'задача',
    period: 0,
    balance: '',
    child: 0,
    goal: false,
    today: false,
    repeat: false,
    plan: 'inbox',
    date: null,
    done: false,
    donedate: null,
    action: null,
    repeatday: 0
}

export const BALANCE = ['работа', 'проект', "семья", "здоровье", "быт", "развитие", "отдых"]
export const PLANS = ['today', 'week', 'upcoming', "later"]

export const TASK_TYPES = {
    plan: 'plan',
    today: 'today'
}

export const DATE_CONSTANTS = [
    { eng: 'today', ru: 'сегодня', days: 0 }, { eng: 'tomorrow', ru: 'завтра', days: 1 }, { eng: 'aftertomorrow', ru: 'послезавтра', days: 2 }
]
