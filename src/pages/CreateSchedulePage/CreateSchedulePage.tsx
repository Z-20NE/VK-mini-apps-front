import React, { FC } from 'react';
import { CreateSchedule } from '../../components/CreateSchedule/CreateSchedule';
import { HeaderWithBackButton } from '../../components/HeaderWithBackButton/HeaderWithBackButton';
import { Pages } from '../../enums/Pages';
import { BasePage, BasePageProps } from '../BasePage/BasePage';

type CreateSchedulePageProps = BasePageProps;

export const CreateSchedulePage: FC<CreateSchedulePageProps> = ({ id, navigationHandler, active }) => {
    return (
        <BasePage
            id={id}
            navigationHandler={navigationHandler}
            active={active}
            header={
                <HeaderWithBackButton navigationHandler={navigationHandler} preventPage={Pages.Schedule}>
                    Новый маршрут
                </HeaderWithBackButton>
            }
        >
            <CreateSchedule navigationHandler={navigationHandler} />
        </BasePage>
    );
};
