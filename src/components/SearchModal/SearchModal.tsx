import { FormItem, Input, ModalPage, ModalPageHeader, PanelHeaderClose, PanelHeaderSubmit } from '@vkontakte/vkui';
import React, { FC } from 'react';
import { Modals } from '../../enums/Modals';

export const SearchModal: FC = () => {
    return (
        <ModalPage
            id={Modals.SearchFilter}
            onClose={() => {}}
            header={
                <ModalPageHeader left={<PanelHeaderClose />} right={<PanelHeaderSubmit />}>
                    Фильтры
                </ModalPageHeader>
            }
        >
            <FormItem top="Пароль">
                <Input type="password" placeholder="Введите пароль" />
            </FormItem>
        </ModalPage>
    );
};
