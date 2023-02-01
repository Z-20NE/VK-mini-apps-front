import { Icon28CancelCircleFillRed } from '@vkontakte/icons';
import {
    Panel,
    Title,
    FormLayoutGroup,
    FormItem,
    FixedLayout,
    Button,
    Snackbar,
    Avatar,
    Separator,
} from '@vkontakte/vkui';
import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import './AdPage.css';
import { Ad, Api } from '../../api/Api';
import { HeaderWithBackButton } from '../../components/HeaderWithBackButton/HeaderWithBackButton';
import { ProfileBlock } from '../../components/ProfileBlock/ProfileBlock';
import { Pages } from '../../enums/Pages';

interface AdPageProps {
    id: string;
    data: Ad;
    setActivePanel: Dispatch<SetStateAction<string>>;
    userId: number | undefined;
    setCreateAd: any;
}

export const AdPage: FC<AdPageProps> = ({ id, data, setActivePanel, userId, setCreateAd }) => {
    const [ad, setAd] = useState<Ad | undefined>(data);
    const [respond, setRespond] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<JSX.Element | null>(null);

    const handleChangeAd = () => {
        setCreateAd(data);
        setActivePanel('change-ad');
    };

    const handleDeleteAd = () => {
        new Api().api
            .deleteApi(ad?.id || -1)
            .then(() => {
                setActivePanel('myAds');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const errorSnack = useMemo(
        () => (
            <Snackbar
                onClose={() => {
                    setSnackbar(null);
                }}
                before={
                    <Avatar size={24}>
                        <Icon28CancelCircleFillRed width={14} height={14} />
                    </Avatar>
                }
            >
                Произошли некоторые проблемы.
            </Snackbar>
        ),
        [],
    );

    const invalidSnack = useMemo(
        () => (
            <Snackbar
                onClose={() => {
                    setSnackbar(null);
                }}
                before={
                    <Avatar size={24}>
                        <Icon28CancelCircleFillRed width={14} height={14} />
                    </Avatar>
                }
            >
                Данный заказ уже исполняет другой пользователь.
            </Snackbar>
        ),
        [],
    );

    const handleRespondAd = async () => {
        new Api().api
            .adsExecutionCreate(data?.id || -1)
            .then(async (response) => {
                setAd(response.data.data);

                setSnackbar(
                    <Snackbar
                        onClose={() => {
                            setSnackbar(null);
                        }}
                        after={<Avatar src={ad?.userAuthorAvatar} size={32} />}
                    >
                        Отправлено {ad?.userAuthorName}.
                    </Snackbar>,
                );

                const botResponse = await fetch(
                    `https://handover.space/bot/respond?author_id=${data.userAuthorVkId}&executor_id=${userId}`,
                );
                if (!botResponse.ok) {
                    setSnackbar(errorSnack);
                }

                setRespond(true);
            })
            .catch((error) => {
                if (error.status === 409) {
                    setSnackbar(invalidSnack);
                    return;
                }

                setSnackbar(errorSnack);
                setRespond(false);
            });
    };

    useEffect(() => {
        new Api().api
            .getApi(data?.id || -1)
            .then(async (response) => {
                const { data } = response;
                setAd(data.data);
                setRespond(!!data.data?.userExecutorVkId);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [data, data?.id]);

    return (
        <Panel id={id}>
            <HeaderWithBackButton
                navigationHandler={setActivePanel}
                preventPage={ad?.userAuthorVkId === userId ? Pages.MyAds : Pages.AdsList}
            >
                Объявление
            </HeaderWithBackButton>
            <FormItem top="Откуда" className="delivery-ad__form-item">
                <Title level="3" weight="regular">
                    {ad?.locDep}
                </Title>
            </FormItem>
            <FormItem top="Куда" className="delivery-ad__form-item">
                <Title level="3" weight="regular">
                    {ad?.locArr}
                </Title>
            </FormItem>
            <FormLayoutGroup mode="horizontal" className="delivery-ad__form-item">
                <FormItem top="Время доставки:">
                    <Title weight="regular" level="3">
                        {ad?.dateTimeArr && ad.dateTimeArr.split(' ')[1]}
                    </Title>
                </FormItem>
            </FormLayoutGroup>
            <FormItem top="Что нужно перевезти?" className="delivery-ad__form-item">
                <Title weight="regular" level="3">
                    {ad?.item}
                </Title>
            </FormItem>
            {data.comment && (
                <FormItem top="Комментарий" className="delivery-ad__form-item">
                    <Title weight="regular" level="3">
                        {ad?.comment}
                    </Title>
                </FormItem>
            )}
            <FormItem top="Цена">
                <Title level="1" weight="semibold" style={{ color: '#2363AD' }}>
                    {ad?.minPrice} &#8381;
                </Title>
            </FormItem>
            <FixedLayout filled vertical="bottom" style={{ bottom: '10px' }}>
                {ad?.userAuthorVkId !== userId ? (
                    <>
                        <Separator />
                        <ProfileBlock
                            id={data?.userAuthorVkId}
                            first_name={ad?.userAuthorName?.split(' ')[0]}
                            last_name={ad?.userAuthorName?.split(' ')[1]}
                            photo_200={ad?.userAuthorAvatar}
                            redirect
                        />
                        <Separator />
                        <FormItem>
                            {respond ? (
                                <Button stretched size="l" mode="tertiary">
                                    {ad?.userExecutorVkId === userId
                                        ? 'Вы исполняете данный заказ'
                                        : 'Исполняется другим пользователем'}
                                </Button>
                            ) : (
                                <Button stretched size="l" onClick={handleRespondAd}>
                                    Откликнуться
                                </Button>
                            )}
                        </FormItem>
                    </>
                ) : (
                    <>
                        <FormItem>
                            <Button stretched size="l" onClick={handleChangeAd}>
                                Изменить
                            </Button>
                        </FormItem>
                        <FormItem>
                            <Button stretched size="l" mode="destructive" onClick={handleDeleteAd}>
                                Удалить
                            </Button>
                        </FormItem>
                    </>
                )}
            </FixedLayout>
            {snackbar}
        </Panel>
    );
};
