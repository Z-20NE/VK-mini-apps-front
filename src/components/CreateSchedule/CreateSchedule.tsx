import {
    FormLayout,
    FormItem,
    Group,
    Input,
    Select,
    Radio,
    Header,
    FormLayoutGroup,
    FixedLayout,
    Button,
} from '@vkontakte/vkui';
import React, { FC } from 'react';

import './CreateSchedule.css';
import { Api } from '../../api/Api';
import { Pages } from '../../enums/Pages';
import { TimeInput } from '../TimeInput/TimeInput';

enum DaysOfTheWeek {
    Monday = 'Mon',
    Tuesday = 'Tue',
    Wednesday = 'Wed',
    Thursday = 'Thu',
    Friday = 'Fri',
    Saturday = 'Sat',
    Sunday = 'Sun',
}

enum WeekType {
    Odd = 'odd',
    Even = 'even',
}

interface CreateScheduleProps {
    navigationHandler: (value: string) => void;
}

export const CreateSchedule: FC<CreateScheduleProps> = ({ navigationHandler }) => {
    const [dayOfTheWeek, setDayOfTheWeek] = React.useState(DaysOfTheWeek.Monday);
    const [timeDeparture, setTimeDeparture] = React.useState('');
    const [timeArrival, setTimeArrival] = React.useState('');
    const [locationFrom, setLocationFrom] = React.useState('');
    const [locationTo, setLocationTo] = React.useState('');
    const [weekType, setWeekType] = React.useState(WeekType.Even);
    const [minPrice, setMinPrice] = React.useState('');

    const [error, setError] = React.useState(false);
    const [errorTime, setErrorTime] = React.useState<string>('');

    const handleChangeDay = React.useCallback((evt) => {
        setDayOfTheWeek(evt.target.value);
    }, []);

    const calculateMinutes = (time: string): number => {
        const [hours, minutes] = time.split(':');

        return Number(hours) * 60 + Number(minutes);
    };

    const validateTime = React.useCallback(
        (dep: string, arr: string): boolean => calculateMinutes(dep) < calculateMinutes(arr),
        [],
    );

    const handleClick = React.useCallback(() => {
        if (timeDeparture.length < 5 || timeArrival.length < 5) {
            setErrorTime('Некорректные данные');
            setError(true);
            return;
        }

        if (!validateTime(timeDeparture, timeArrival)) {
            setError(true);
            setErrorTime('Некорректное время прибытия');
            return;
        }

        setErrorTime('');

        if (!locationTo || !locationFrom || !minPrice || !timeDeparture) {
            setError(true);
            return;
        }

        setError(false);

        const body = {
            locDep: locationFrom,
            locArr: locationTo,
            evenWeek: weekType === WeekType.Even,
            oddWeek: weekType === WeekType.Odd,
            timeDep: timeDeparture,
            timeArr: timeArrival,
            minPrice: Number(minPrice),
            dayOfWeek: dayOfTheWeek,
        };

        new Api().api
            .usersRoutesPermCreate(body)
            .then(({ ok }) => {
                if (!ok) {
                    console.log('что то пошло не так');
                }

                navigationHandler(Pages.Schedule);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [
        dayOfTheWeek,
        locationFrom,
        locationTo,
        minPrice,
        navigationHandler,
        timeArrival,
        timeDeparture,
        validateTime,
        weekType,
    ]);

    const handleChangeFrom = React.useCallback((evt) => {
        setLocationFrom(evt.target.value);
    }, []);

    const handleChangeTo = React.useCallback((evt) => {
        setLocationTo(evt.target.value);
    }, []);

    const handleChangeRadio = React.useCallback((evt) => {
        setWeekType(evt.target.value);
    }, []);

    const handleChangeMinPrice = React.useCallback((evt) => {
        const target = evt.target as HTMLInputElement;

        if (Number.isNaN(Number(target.value))) {
            return;
        }

        setMinPrice(target.value);
    }, []);

    return (
        <Group>
            <FormLayout className="create-schedule__content">
                <FormItem
                    top="Откуда"
                    status={!locationFrom && error ? 'error' : undefined}
                    bottom={!locationFrom && error && 'Обязательное поле'}
                >
                    <Input placeholder="Начало маршрута" value={locationFrom} onChange={handleChangeFrom} />
                </FormItem>
                <FormItem
                    top="Куда"
                    status={!locationTo && error ? 'error' : undefined}
                    bottom={!locationTo && error && 'Обязательное поле'}
                >
                    <Input placeholder="Конечная точка маршрута" value={locationTo} onChange={handleChangeTo} />
                </FormItem>
                <FormItem top="Неделя">
                    <Radio name="type" value={WeekType.Even} onChange={handleChangeRadio} defaultChecked>
                        Чётная
                    </Radio>
                    <Radio name="type" value={WeekType.Odd} onChange={handleChangeRadio}>
                        Нечётная
                    </Radio>
                </FormItem>
                <FormItem top="День недели">
                    <Select
                        name="dayOfTheWeek"
                        value={dayOfTheWeek}
                        onChange={handleChangeDay}
                        options={[
                            {
                                value: DaysOfTheWeek.Monday,
                                label: 'Понедельник',
                            },
                            {
                                value: DaysOfTheWeek.Tuesday,
                                label: 'Вторник',
                            },
                            {
                                value: DaysOfTheWeek.Wednesday,
                                label: 'Среда',
                            },
                            {
                                value: DaysOfTheWeek.Thursday,
                                label: 'Четверг',
                            },
                            {
                                value: DaysOfTheWeek.Friday,
                                label: 'Пятница',
                            },
                            {
                                value: DaysOfTheWeek.Saturday,
                                label: 'Суббота',
                            },
                            {
                                value: DaysOfTheWeek.Sunday,
                                label: 'Воскресенье',
                            },
                        ]}
                    />
                </FormItem>
                <Group
                    header={
                        <Header>
                            Выберите время, в которое
                            <br /> вам будут присылать уведомления
                        </Header>
                    }
                >
                    <FormLayoutGroup mode="horizontal">
                        <TimeInput error={error} header="От" time={timeDeparture} setTime={setTimeDeparture} />
                        <TimeInput
                            error={error}
                            header="До"
                            time={timeArrival}
                            setTime={setTimeArrival}
                            status={error && errorTime ? 'error' : undefined}
                            bottom={errorTime}
                        />
                    </FormLayoutGroup>
                </Group>
                <FormItem
                    top="Минимальная цена"
                    status={!minPrice && error ? 'error' : undefined}
                    bottom={!minPrice && error && 'Обязательное поле'}
                >
                    <Input placeholder="500" value={minPrice} onChange={handleChangeMinPrice} />
                </FormItem>
            </FormLayout>
            <FixedLayout filled vertical="bottom" style={{ bottom: '50px' }}>
                <FormItem>
                    <Button stretched size="l" onClick={handleClick}>
                        Создать
                    </Button>
                </FormItem>
            </FixedLayout>
        </Group>
    );
};
