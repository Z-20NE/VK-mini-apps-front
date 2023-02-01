import { Card, FormItem, FormLayoutGroup, Input, Text } from '@vkontakte/vkui';
import './DeliveryAd.css';
import * as React from 'react';
import { Arrow } from '../../images/arrow/Arrow';

export const DeliveryAd = function DeliveryAd({
    id,
    locDep,
    locArr,
    minPrice,
    dateTimeArr,
    item,
    comment,
    userAuthorVkId,
    setActivePanel,
    setAdData,
}) {
    const handleClickCard = () => {
        setActivePanel('one-ad');
        setAdData({ id, userAuthorVkId, locDep, locArr, minPrice, dateTimeArr, item, comment });
    };

    return (
        <Card mode="shadow" onClick={handleClickCard}>
            <FormItem>
                <div className="delivery-ad__travel">
                    <Text weight="medium" className="delivery-ad__text">
                        {locDep}
                    </Text>
                    <div className="delivery-ad__icon">
                        <Arrow />
                    </div>
                    <Text weight="medium" className="delivery-ad__text">
                        {locArr}
                    </Text>
                </div>
            </FormItem>
            <FormLayoutGroup mode="horizontal" className="delivery-ad__form-item">
                <FormItem top="Время доставки:">
                    <Text weight="semibold">{dateTimeArr.split(' ')[1]}</Text>
                </FormItem>
            </FormLayoutGroup>
            <FormItem top="Что нужно перевезти?" className="delivery-ad__form-item">
                <Input value={item} disabled />
            </FormItem>
            <FormItem top="Цена">
                <Text weight="semibold" className="delivery-ad__price">
                    {minPrice} руб.
                </Text>
            </FormItem>
        </Card>
    );
};
