import React, { FC } from 'react';
import { DeliveryAdsList } from '../../components/DeliveryAdsList/DeliveryAdsList';
import { HeaderWithBackButton } from '../../components/HeaderWithBackButton/HeaderWithBackButton';
import { BackendPaths } from '../../enums/BackendPaths';
import { Pages } from '../../enums/Pages';
import { customFetch } from '../../helpers/customFetch/customFetch';
import { BasePage, BasePageProps } from '../BasePage/BasePage';

type MyAdsListPageProps = BasePageProps & {
    setAdData: any;
};

export const MyAdsListPage: FC<MyAdsListPageProps> = ({ id, navigationHandler, active, setAdData }) => {
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        customFetch(BackendPaths.MyAdsList)
            .then(({ data }) => {
                if (data === 'no data') {
                    setCards([]);
                    setIsLoading(false);
                    return;
                }
                setCards(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setCards([]);
                setIsLoading(false);
            });
    }, []);

    return (
        <BasePage
            id={id}
            active={active}
            navigationHandler={navigationHandler}
            header={
                <HeaderWithBackButton navigationHandler={navigationHandler} preventPage={Pages.Profile}>
                    Мои объявления
                </HeaderWithBackButton>
            }
        >
            <DeliveryAdsList
                isLoading={isLoading}
                cards={cards}
                setActivePanel={navigationHandler}
                setAdData={setAdData}
                isMy
            />
        </BasePage>
    );
};
