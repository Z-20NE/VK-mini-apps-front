import { CardGrid, Footer, Spinner } from '@vkontakte/vkui';
import React, { FC } from 'react';

import { DeliveryAd } from '../DeliveryAd/DeliveryAd';

import './DeliveryAdsList.css';

export interface DeliveryAdsListProps {
    cards: Array<any>;
    setActivePanel: any;
    setAdData: any;

    isLoading: boolean;
    isMy?: boolean;
}

export const DeliveryAdsList: FC<DeliveryAdsListProps> = ({
    isLoading,
    cards,
    setActivePanel,
    setAdData,
    isMy = false,
}) => {
    return isLoading ? (
        <div className="delivery-ads-list__loader">
            <Spinner size="large" />
        </div>
    ) : (
        <div className="delivery-ads-list">
            <CardGrid size="l">
                {cards.map((item, index) => (
                    <DeliveryAd {...item} key={index} setAdData={setAdData} setActivePanel={setActivePanel} />
                ))}
                {!isMy && !cards.length && (
                    <Footer>К сожалению, пока нет активных объявлений, создавайте объявления для работы сервиса</Footer>
                )}
                {isMy && !cards.length && (
                    <Footer>История ваших объявлений пуста, создавайте объявления, чтобы увидеть их здесь</Footer>
                )}
            </CardGrid>
        </div>
    );
};
