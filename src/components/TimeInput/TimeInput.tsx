import { FormItem, Input } from '@vkontakte/vkui';
import React, { FC, ReactNode } from 'react';
import './TimeInput.css';
import { getMasked } from '../../helpers/mask/mask';

interface TimeInput {
    header: string | ReactNode;
    error: boolean;
    time: string;
    setTime: React.Dispatch<React.SetStateAction<string>>;
    status?: 'error' | 'default' | 'valid' | undefined;
    bottom?: React.ReactNode;
}

export const TimeInput: FC<TimeInput> = ({ error, header, time, setTime, status, bottom }) => {
    const handleChangeTime = (evt: React.ChangeEvent) => {
        const target = evt.target as HTMLInputElement;
        const masked = getMasked(target.value);

        setTime(masked);
    };

    const formStatus = status || ((!time && error) || (time.length !== 5 && error) ? 'error' : undefined);
    const formBottom =
        bottom || (!time && error ? 'Обязательное поле' : time.length !== 5 && error && 'Некорректные данные');

    return (
        <FormItem top={header} className="time" status={formStatus} bottom={formBottom}>
            <Input placeholder="14:20" value={time} onChange={handleChangeTime} />
        </FormItem>
    );
};
