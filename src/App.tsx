import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import {
    View,
    AdaptivityProvider,
    AppRoot,
    ModalRoot,
    SplitLayout,
    ModalPage,
    ModalPageHeader,
    PanelHeaderClose,
    FormItem,
    Input,
    Radio,
} from '@vkontakte/vkui';
import React, { useState, useEffect, useCallback, FC } from 'react';
import '@vkontakte/vkui/dist/vkui.css';

import { Modals } from './enums/Modals';
import { Pages } from './enums/Pages';
import { AdPage } from './pages/AdPage/AdPage';
import { AdsListPage } from './pages/AdsListPage/AdsListPage';
import { ChangeAds } from './pages/ChangeAds/ChangeAds';
import { CreateAds } from './pages/CreateAds/CreateAds';
import { CreateSchedulePage } from './pages/CreateSchedulePage/CreateSchedulePage';
import { MyAdsListPage } from './pages/MyAdsListPage/MyAdsListPage';
import { Profile } from './pages/Profile/Profile';
import { SchedulePage } from './pages/SchedulePage/SchedulePage';

const App: FC = () => {
    const [activePanel, setActivePanel] = useState('adsListPage');
    const [activeModal, setActiveModal] = useState(null);
    const [adData, setAdData] = useState({});
    const [fetchedUser, setUser] = useState<UserInfo | undefined>();
    const [popout, setPopout] = useState(null);
    const [modalPriceInput, setModalPriceInput] = useState('');
    const [createAd, setCreateAd] = useState({});
    const [appStarted, setAppStarted] = useState(false);
    const [order, setOrder] = useState('0');

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }

            if (type === 'VKWebAppAllowMessagesFromGroupResult') {
                console.log('VKWebAppAllowMessagesFromGroupResult');
            }

            if (type === 'VKWebAppAllowMessagesFromGroupFailed') {
                console.log(data);
            }
        });

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);

            const session = await fetch('/api/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vkId: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    avatar: user.photo_200,
                }),
                credentials: 'include',
            });

            if (!session.ok) {
                console.log(`/api/sessions: ${session.status}`);
            }

            setAppStarted(true);

            await bridge.send('VKWebAppAllowMessagesFromGroup', { group_id: 207601466 });
        }

        fetchData();
    }, []);

    const handleCloseModal = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setActiveModal(null);
    }, []);

    const handleChangePrice = useCallback((evt) => {
        setModalPriceInput(evt.target.value);
    }, []);

    const onClickMyAds = useCallback(() => {
        setActivePanel('myAds');
    }, []);

    const handleClickSchedule = useCallback(() => {
        setActivePanel(Pages.Schedule);
    }, []);

    const handleClickAddSchedule = useCallback(() => {
        setActivePanel(Pages.CreateSchedule);
    }, []);

    const modal = (
        <ModalRoot activeModal={activeModal} onClose={handleCloseModal}>
            <ModalPage
                id={Modals.SearchFilter}
                onClose={handleCloseModal}
                header={
                    <ModalPageHeader right={<PanelHeaderClose onClick={handleCloseModal} />}>Фильтры</ModalPageHeader>
                }
            >
                <FormItem top="Максимальная цена">
                    <Input type="number" value={modalPriceInput} onChange={handleChangePrice} />
                </FormItem>
                <FormItem top="Сортировка">
                    <Radio
                        name="radio"
                        value="0"
                        checked={order === '0'}
                        onClick={() => {
                            setOrder('0');
                        }}
                    >
                        Сначала новые
                    </Radio>
                    <Radio
                        name="radio"
                        value="1"
                        checked={order === '1'}
                        onClick={() => {
                            setOrder('1');
                        }}
                    >
                        Сначала старые
                    </Radio>
                    <Radio
                        name="radio"
                        value="2"
                        checked={order === '2'}
                        onClick={() => {
                            setOrder('2');
                        }}
                    >
                        Сначала дорогие
                    </Radio>
                    <Radio
                        name="radio"
                        value="3"
                        checked={order === '3'}
                        onClick={() => {
                            setOrder('3');
                        }}
                    >
                        Сначала дешевые
                    </Radio>
                </FormItem>
            </ModalPage>
        </ModalRoot>
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
        <AdaptivityProvider>
            <AppRoot>
                <SplitLayout modal={modal}>
                    <View activePanel={activePanel} popout={popout}>
                        <CreateAds
                            id={Pages.CreateAds}
                            active={activePanel}
                            navigationHandler={setActivePanel}
                            setPopout={setPopout}
                            setActivePanel={setActivePanel}
                        />
                        <AdsListPage
                            id={Pages.AdsList}
                            active={activePanel}
                            navigationHandler={setActivePanel}
                            priceFilter={modalPriceInput}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            modalHandler={setActiveModal}
                            setAdData={setAdData}
                            appStarted={appStarted}
                            order={order}
                        />
                        <Profile
                            id={Pages.Profile}
                            active={activePanel}
                            navigationHandler={setActivePanel}
                            user={fetchedUser}
                            onClickMyAds={onClickMyAds}
                            onClickSchedule={handleClickSchedule}
                        />
                        <AdPage
                            id={Pages.OneAd}
                            data={adData}
                            setActivePanel={setActivePanel}
                            setCreateAd={setCreateAd}
                            userId={fetchedUser?.id}
                        />
                        <MyAdsListPage
                            id={Pages.MyAds}
                            active={activePanel}
                            navigationHandler={setActivePanel}
                            setAdData={setAdData}
                        />
                        <ChangeAds
                            id={Pages.ChangeAd}
                            navigationHandler={setActivePanel}
                            active={activePanel}
                            setPopout={setPopout}
                            setActivePanel={setActivePanel}
                            data={createAd}
                        />
                        <SchedulePage
                            id={Pages.Schedule}
                            navigationHandler={setActivePanel}
                            active={activePanel}
                            onClickAddSchedule={handleClickAddSchedule}
                        />
                        <CreateSchedulePage
                            id={Pages.CreateSchedule}
                            navigationHandler={setActivePanel}
                            active={activePanel}
                        />
                    </View>
                </SplitLayout>
            </AppRoot>
        </AdaptivityProvider>
    );
};

export default App;
