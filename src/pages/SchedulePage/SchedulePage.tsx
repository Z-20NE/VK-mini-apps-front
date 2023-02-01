import React, { FC } from 'react';
import { HeaderWithBackButton } from '../../components/HeaderWithBackButton/HeaderWithBackButton';
import { ScheduleList } from '../../components/ScheduleList/ScheduleList';
import { Pages } from '../../enums/Pages';
import { BasePage, BasePageProps } from '../BasePage/BasePage';

type SchedulePageProps = BasePageProps & {
    onClickAddSchedule: () => void;
};

export const SchedulePage: FC<SchedulePageProps> = ({ id, active, navigationHandler, onClickAddSchedule }) => {
    return (
        <BasePage
            id={id}
            active={active}
            navigationHandler={navigationHandler}
            header={
                <HeaderWithBackButton navigationHandler={navigationHandler} preventPage={Pages.Profile}>
                    Моё расписание
                </HeaderWithBackButton>
            }
        >
            <ScheduleList onClickAddSchedule={onClickAddSchedule} />
        </BasePage>
    );
};
