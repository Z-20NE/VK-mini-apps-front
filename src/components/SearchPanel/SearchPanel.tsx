import { Input } from '@vkontakte/vkui';
import React, { FC } from 'react';

import { SettingsIcon } from '../../images/settings/SettingsIcon';

import './SearchPanel.css';

interface SearchPanelProps {
    fromInput: string;
    onChangeFromInput: (evt: any) => void;
    toInput: string;
    onChangeToInput: (evt: any) => void;
    onOpenModal: () => void;
}

export const SearchPanel: FC<SearchPanelProps> = ({
    fromInput,
    onChangeFromInput,
    toInput,
    onChangeToInput,
    onOpenModal,
}) => {
    const handleClick = React.useCallback(() => {
        if (onOpenModal) {
            onOpenModal();
        }
    }, [onOpenModal]);

    return (
        <div className="search-panel">
            <div className="search-panel__inputs-block">
                <Input type="text" placeholder="Откуда" value={fromInput} onChange={onChangeFromInput} />
                <Input
                    type="text"
                    placeholder="Куда"
                    className="search-panel__input"
                    value={toInput}
                    onChange={onChangeToInput}
                />
            </div>
            <div className="search-panel__icon" onClick={handleClick}>
                <SettingsIcon />
            </div>
        </div>
    );
};
