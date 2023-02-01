import { Icon24AddSquareOutline, Icon24ServicesOutline, Icon24UserCircleOutline } from '@vkontakte/icons';
import React from 'react';

export const iconIds = {
    add: 'createads',
    search: 'adsListPage',
    profile: 'profile',
};

const iconsProps = (isActive) => ({
    fill: isActive ? '#4a86cc' : '#99a2ad',
    // width: 20,
    // height: 20,
});

export const icons = [
    {
        id: 'profile',
        content: <Icon24UserCircleOutline {...iconsProps()} />,
        activeContent: <Icon24UserCircleOutline {...iconsProps(true)} />,
        text: 'Профиль',
    },
    {
        id: 'add',
        content: <Icon24AddSquareOutline {...iconsProps()} />,
        activeContent: <Icon24AddSquareOutline {...iconsProps(true)} />,
        text: 'Создать',
    },
    {
        id: 'search',
        content: <Icon24ServicesOutline {...iconsProps()} />,
        activeContent: <Icon24ServicesOutline {...iconsProps(true)} />,
        text: 'Лента',
    },
];
