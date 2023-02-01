import { Panel, PanelHeader } from '@vkontakte/vkui';
import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { NavigationPanel } from '../../components/NavigationPanel/NavigationPanel';
import { Pages } from '../../enums/Pages';

export interface BasePageProps {
    id: string;
    active: string;
    navigationHandler: Dispatch<SetStateAction<string>>;
    headerText?: string;
    header?: ReactNode;
    children?: ReactNode;
}

export const BasePage: FC<BasePageProps> = function BasePage({
    id,
    headerText,
    active,
    header,
    navigationHandler,
    children,
}) {
    return (
        <Panel id={id}>
            {header || <PanelHeader>{headerText}</PanelHeader>}
            <div style={{ paddingBottom: 70, paddingTop: header && active === Pages.AdsList ? 130 : 0 }}>
                {children}
            </div>
            <NavigationPanel active={active} navigationHandler={navigationHandler} />
        </Panel>
    );
};
