import { Icon24CalendarOutline, Icon20CheckNewsfeedOutline } from '@vkontakte/icons';
import { Cell } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import React from 'react';
import { ProfileBlock } from '../../components/ProfileBlock/ProfileBlock';
import { BasePage } from '../BasePage/BasePage';
import './Profile.css';

export const Profile = ({ id, user, active, navigationHandler, onClickMyAds, onClickSchedule }) => {
    return (
        <BasePage id={id} active={active} headerText="Профиль" navigationHandler={navigationHandler}>
            {user && <ProfileBlock {...user} />}
            <Cell before={<Icon20CheckNewsfeedOutline fill="#99A2AD" height={35} width={35} />} onClick={onClickMyAds}>
                Мои объявления
            </Cell>
            <div className="profile-schedule__box">
                <Cell
                    before={<Icon24CalendarOutline fill="#99A2AD" width={35} height={35} />}
                    className="profile-schedule"
                    onClick={onClickSchedule}
                >
                    Моё расписание
                </Cell>
                {/* в будущем здесь будет тултип */}
                {/* <div className="profile-question"> */}
                {/*    <Icon20HelpOutline fill="#99A2AD" /> */}
                {/* </div> */}
            </div>
        </BasePage>
    );
};

Profile.propTypes = {
    id: PropTypes.string.isRequired,
};
