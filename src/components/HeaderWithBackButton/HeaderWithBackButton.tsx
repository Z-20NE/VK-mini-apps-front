import { Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { Pages } from '../../enums/Pages';

interface HeaderWithBackButtonProps {
    preventPage: Pages;
    navigationHandler: Dispatch<SetStateAction<string>>;
}

export const HeaderWithBackButton: FC<HeaderWithBackButtonProps> = ({ navigationHandler, preventPage, children }) => {
    const handleClick = React.useCallback(() => {
        navigationHandler(preventPage);
    }, [navigationHandler, preventPage]);

    return (
        <PanelHeader
            left={
                <PanelHeaderButton>
                    <Icon28ChevronLeftOutline onClick={handleClick} />
                </PanelHeaderButton>
            }
        >
            {children}
        </PanelHeader>
    );
};
