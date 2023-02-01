import { Icon28AddOutline } from '@vkontakte/icons';
import { CellButton, Footer, Group, Separator, Tabs, TabsItem } from '@vkontakte/vkui';
import React, { FC, useMemo, useState } from 'react';
import './Schedule.css';

import { Api, RoutePerm } from '../../api/Api';
import { ScheduleCard } from '../ScheduleCard/ScheduleCard';

type ScheduleListProps = {
    onClickAddSchedule: () => void;
};

// ебанный кринжовый енам обосанный
// TODO: заменить на православный 'odd' | 'even'
enum TabType {
    ODD,
    EVEN,
}

export const ScheduleList: FC<ScheduleListProps> = ({ onClickAddSchedule }) => {
    const [routes, setRoutes] = useState<RoutePerm[]>([]);
    const [tab, setTab] = useState<TabType>(TabType.ODD);

    React.useEffect(() => {
        new Api().api
            .usersRoutesPermListList()
            .then(({ data }) => {
                setRoutes(data.data || []);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const oddRoutes = useMemo(() => routes.filter((route) => route.oddWeek), [routes]);
    const evenRoutes = useMemo(() => routes.filter((route) => route.evenWeek), [routes]);

    const resultRoutes = (tab === TabType.ODD ? oddRoutes : evenRoutes).map((route, idx) => (
        <ScheduleCard {...route} setRoutes={setRoutes} key={idx} />
    ));

    return (
        <>
            <Group>
                <Tabs>
                    <TabsItem
                        onClick={() => {
                            setTab(TabType.ODD);
                        }}
                        selected={tab === TabType.ODD}
                    >
                        Нечетная
                    </TabsItem>
                    <TabsItem
                        onClick={() => {
                            setTab(TabType.EVEN);
                        }}
                        selected={tab === TabType.EVEN}
                    >
                        Четная
                    </TabsItem>
                </Tabs>
                <Separator style={{ margin: '10px 0' }} />
                {resultRoutes.length > 0 ? (
                    resultRoutes
                ) : (
                    <Footer className="schedule">
                        Здесь пока нет вашего расписания
                        <br />
                        <br />
                        Добавляйте сюда свое расписание, чтобы бот отправлял вам оповещения о новых заказах в только
                        удобное для вас время.
                        <br /> <br />
                        Вам будет не обязательно заходить в приложение, чтобы узнать о новых заказах!
                    </Footer>
                )}
            </Group>
            <Group className="schedule__add-schedule">
                <CellButton before={<Icon28AddOutline />} onClick={onClickAddSchedule}>
                    Добавить расписание
                </CellButton>
            </Group>
        </>
    );
};
