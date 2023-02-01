import { Button, RichCell } from '@vkontakte/vkui';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { Api, RoutePerm } from '../../api/Api';
import { dayOfWeekMap } from './ScheduleCard.config';

interface ScheduleCardProps extends RoutePerm {
    setRoutes: Dispatch<SetStateAction<RoutePerm[]>>;
}

export const ScheduleCard: FC<ScheduleCardProps> = ({
    id,
    locDep,
    locArr,
    minPrice,
    timeArr,
    timeDep,
    dayOfWeek,
    setRoutes,
}) => {
    // const handleChange = () => {};

    const handleDelete = () => {
        new Api().api
            .usersRoutesPermDelete(id || -1)
            .then(({ data }) => {
                const deletedId = data.data?.id;
                setRoutes((r) => r.filter((item) => item.id !== deletedId));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <RichCell
            multiline
            text={`Из "${locDep}" в "${locArr}"`}
            caption={`С ${timeDep} до ${timeArr}`}
            after={`${minPrice} руб.`}
            actions={
                <>
                    {/* <Button onClick={handleChange}>Изменить</Button> */}
                    <Button mode="destructive" onClick={handleDelete}>
                        Удалить
                    </Button>
                </>
            }
        >
            {dayOfWeekMap[dayOfWeek || 'Mon']}
        </RichCell>
    );
};
