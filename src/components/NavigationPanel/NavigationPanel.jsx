import { Caption, FixedLayout, IconButton } from '@vkontakte/vkui';
import * as React from 'react';
import { iconIds, icons } from './NavigationPanel.config';
import './NavigationPanel.css';

export const NavigationPanel = function NavigationPanel({ active, navigationHandler }) {
    const [activeId, setActiveId] = React.useState(active);

    const onClickHandler = React.useCallback(
        (evt) => {
            const currentId = evt.currentTarget.id;
            if (navigationHandler && iconIds[currentId]) {
                navigationHandler(iconIds[currentId]);
                setActiveId(iconIds[currentId]);
            }
        },
        [navigationHandler],
    );

    return (
        <FixedLayout filled vertical="bottom">
            <div className="navigational-panel">
                {icons.map((item, idx) => (
                    <div className="icon-button" key={idx}>
                        <IconButton id={item.id} onClick={onClickHandler} key={item.id}>
                            {iconIds[item.id] === activeId ? item.activeContent : item.content}
                        </IconButton>
                        <Caption
                            level="1"
                            weight="regular"
                            className="icon-button__text"
                            style={{ color: iconIds[item.id] === activeId ? '#4a86cc' : '#99a2ad' }}
                        >
                            {item.text}
                        </Caption>
                    </div>
                ))}
            </div>
        </FixedLayout>
    );
};
