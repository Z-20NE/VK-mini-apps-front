/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
    /**
     * Идентификатор VK Mini App
     * @format int32
     */
    vkId?: number;

    /**
     * Имя
     * @example Василий Петров
     */
    name?: string;

    /**
     * URL аватара
     * @example http://yandex.ru/favicon.png
     */
    avatar?: string;
}

export interface Route {
    /**
     * Место отправления
     * @example Корпус Энерго
     */
    locDep?: string;

    /**
     * Место прибытия
     * @example Корпус УЛК
     */
    locArr?: string;

    /**
     * Минимальная цена доставки (в рублях)
     * @format int32
     * @min 0
     * @example 500
     */
    minPrice?: number;
}

export type RouteTmpCreate = Route & { dateTimeDep?: string; dateTimeArr?: string };

export type RouteTmpUpdate = RouteTmpCreate;

export type RouteTmp = { id?: number; userAuthorVkId?: number } & RouteTmpCreate;

export type RoutePermCreate = Route & {
    evenWeek?: boolean;
    oddWeek?: boolean;
    dayOfWeek?: string;
    timeDep?: string;
    timeArr?: string;
};

export type RoutePermUpdate = RoutePermCreate;

export type RoutePerm = { id?: number; userAuthorVkId?: number } & RoutePermCreate;

export interface AdCreate {
    /**
     * Место отправления
     * @example Корпус Энерго
     */
    locDep?: string;

    /**
     * Место прибытия
     * @example Корпус УЛК
     */
    locArr?: string;

    /**
     * Дата и время прибытия
     * @format date-time
     */
    dateTimeArr?: string;

    /**
     * Доставляемый предмет
     * @example Зачётная книжка
     */
    item?: string;

    /**
     * Минимальная цена доставки (в рублях)
     * @format int32
     * @min 0
     * @example 500
     */
    minPrice?: number;

    /**
     * Комментарий
     * @example Ребята, просьба срочно довезти!
     */
    comment?: string;
}

export type AdUpdate = AdCreate;

export type Ad = {
    id?: number;
    userAuthorVkId?: number;
    userAuthorName?: string;
    userAuthorAvatar?: string;
    userExecutorVkId?: number;
} & AdCreate;

export type ApiSessionsBody = User;

export interface InlineResponse200 {
    data?: User;
}

export type UsersRoutestmpBody = RouteTmpCreate;

export interface InlineResponse201 {
    data?: RouteTmp;
}

export type RoutestmpIdBody = RouteTmpUpdate;

export interface InlineResponse2001 {
    data?: RouteTmp[];
}

export type UsersRoutespermBody = RoutePermCreate;

export interface InlineResponse2011 {
    data?: RoutePerm;
}

export type RoutespermIdBody = RoutePermUpdate;

export interface InlineResponse2002 {
    data?: RoutePerm[];
}

export type ApiAdsBody = AdCreate;

export interface InlineResponse2012 {
    data?: Ad;
}

export interface InlineResponse2003 {
    data?: Ad[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
    Json = 'application/json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = 'https://handover.space';
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
    private abortControllers = new Map<CancelToken, AbortController>();
    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

    private baseApiParams: RequestParams = {
        credentials: 'same-origin',
        headers: {},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig);
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    private encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
    }

    private addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key]);
    }

    private addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key];
        return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
        return keys
            .map((key) =>
                Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key),
            )
            .join('&');
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : '';
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) =>
            input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key];
                formData.append(
                    key,
                    property instanceof Blob
                        ? property
                        : typeof property === 'object' && property !== null
                        ? JSON.stringify(property)
                        : `${property}`,
                );
                return formData;
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    };

    private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                return abortController.signal;
            }
            return void 0;
        }

        const abortController = new AbortController();
        this.abortControllers.set(cancelToken, abortController);
        return abortController.signal;
    };

    public abortRequest = (cancelToken: CancelToken) => {
        const abortController = this.abortControllers.get(cancelToken);

        if (abortController) {
            abortController.abort();
            this.abortControllers.delete(cancelToken);
        }
    };

    public request = async <T = any, E = any>({
        body,
        secure,
        path,
        type,
        query,
        format,
        baseUrl,
        cancelToken,
        ...params
    }: FullRequestParams): Promise<HttpResponse<T, E>> => {
        const secureParams =
            ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const queryString = query && this.toQueryString(query);
        const payloadFormatter = this.contentFormatters[type || ContentType.Json];
        const responseFormat = format || requestParams.format;

        return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
            ...requestParams,
            headers: {
                ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
                ...(requestParams.headers || {}),
            },
            signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
            body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
        }).then(async (response) => {
            const r = response as HttpResponse<T, E>;
            r.data = null as unknown as T;
            r.error = null as unknown as E;

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                      .then((data) => {
                          if (r.ok) {
                              r.data = data;
                          } else {
                              r.error = data;
                          }
                          return r;
                      })
                      .catch((e) => {
                          r.error = e;
                          return r;
                      });

            if (cancelToken) {
                this.abortControllers.delete(cancelToken);
            }

            if (!response.ok) throw data;
            return data;
        });
    };
}

/**
 * @title HandOver API
 * @version 1.2
 * @license Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html)
 * @baseUrl https://virtserver.swaggerhub.com/NikitaLobaev/HandOver/1.2
 * @contact <nikitos2255@yandex.ru>
 *
 * HandOver API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    api = {
        /**
         * No description
         *
         * @tags sessions
         * @name SessionsCreate
         * @summary Авторизация
         * @request POST:/api/sessions
         */
        sessionsCreate: (data: ApiSessionsBody, params: RequestParams = {}) =>
            this.request<InlineResponse200, void>({
                path: `/api/sessions`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersRoutesTmpCreate
         * @summary Создание разового маршрута в расписании
         * @request POST:/api/users/routes-tmp
         */
        usersRoutesTmpCreate: (data: UsersRoutestmpBody, params: RequestParams = {}) =>
            this.request<InlineResponse201, void>({
                path: `/api/users/routes-tmp`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersRoutesTmpDetail
         * @summary Получение разового маршрута из расписания
         * @request GET:/api/users/routes-tmp/{id}
         */
        usersRoutesTmpDetail: (id: number, params: RequestParams = {}) =>
            this.request<InlineResponse201, void>({
                path: `/api/users/routes-tmp/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersRoutesTmpUpdate
         * @summary Обновление разового маршрута в расписании
         * @request PUT:/api/users/routes-tmp/{id}
         */
        usersRoutesTmpUpdate: (id: number, data: RoutestmpIdBody, params: RequestParams = {}) =>
            this.request<InlineResponse201, void>({
                path: `/api/users/routes-tmp/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersRoutesTmpDelete
         * @summary Удаление разового маршрута из расписания
         * @request DELETE:/api/users/routes-tmp/{id}
         */
        usersRoutesTmpDelete: (id: number, params: RequestParams = {}) =>
            this.request<InlineResponse201, void>({
                path: `/api/users/routes-tmp/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersRoutesTmpListList
         * @summary Список разовых маршрутов в расписании
         * @request GET:/api/users/routes-tmp/list
         */
        usersRoutesTmpListList: (params: RequestParams = {}) =>
            this.request<InlineResponse2001, void>({
                path: `/api/users/routes-tmp/list`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersRoutesPermCreate
         * @summary Создание постоянного маршрута в расписании
         * @request POST:/api/users/routes-perm
         */
        usersRoutesPermCreate: (data: UsersRoutespermBody, params: RequestParams = {}) =>
            this.request<InlineResponse2011, void>({
                path: `/api/users/routes-perm`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersRoutesPermDetail
         * @summary Получение постоянного маршрута из расписания
         * @request GET:/api/users/routes-perm/{id}
         */
        usersRoutesPermDetail: (id: number, params: RequestParams = {}) =>
            this.request<InlineResponse2011, void>({
                path: `/api/users/routes-perm/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersRoutesPermUpdate
         * @summary Обновление постоянного маршрута в расписании
         * @request PUT:/api/users/routes-perm/{id}
         */
        usersRoutesPermUpdate: (id: number, data: RoutespermIdBody, params: RequestParams = {}) =>
            this.request<InlineResponse2011, void>({
                path: `/api/users/routes-perm/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersRoutesPermDelete
         * @summary Удаление постоянного маршрута из расписания
         * @request DELETE:/api/users/routes-perm/{id}
         */
        usersRoutesPermDelete: (id: number, params: RequestParams = {}) =>
            this.request<InlineResponse2011, void>({
                path: `/api/users/routes-perm/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags users
         * @name UsersRoutesPermListList
         * @summary Список постоянных маршрутов в расписании
         * @request GET:/api/users/routes-perm/list
         */
        usersRoutesPermListList: (params: RequestParams = {}) =>
            this.request<InlineResponse2002, void>({
                path: `/api/users/routes-perm/list`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ads
         * @name PostApi
         * @summary Создание объявления
         * @request POST:/api/ads
         */
        postApi: (data: ApiAdsBody, params: RequestParams = {}) =>
            this.request<InlineResponse2012, void>({
                path: `/api/ads`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ads
         * @name GetApi
         * @summary Получение объявления
         * @request GET:/api/ads/{id}
         */
        getApi: (id: number, params: RequestParams = {}) =>
            this.request<InlineResponse2012, void>({
                path: `/api/ads/${id}`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ads
         * @name PutApi
         * @summary Обновление объявления
         * @request PUT:/api/ads/{id}
         */
        putApi: (id: number, data: AdUpdate, params: RequestParams = {}) =>
            this.request<InlineResponse2012, void>({
                path: `/api/ads/${id}`,
                method: 'PUT',
                body: data,
                type: ContentType.Json,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ads
         * @name DeleteApi
         * @summary Удаление объявления
         * @request DELETE:/api/ads/{id}
         */
        deleteApi: (id: number, params: RequestParams = {}) =>
            this.request<InlineResponse2012, void>({
                path: `/api/ads/${id}`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ads
         * @name AdsListList
         * @summary Список объявлений пользователя
         * @request GET:/api/ads/list
         */
        adsListList: (params: RequestParams = {}) =>
            this.request<InlineResponse2003, void>({
                path: `/api/ads/list`,
                method: 'GET',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ads
         * @name AdsSearchList
         * @summary Поиск объявлений
         * @request GET:/api/ads/search
         */
        adsSearchList: (
            query?: { loc_dep?: string; loc_arr?: string; date_time_arr?: string; max_price?: number; order?: number },
            params: RequestParams = {},
        ) =>
            this.request<InlineResponse2003, void>({
                path: `/api/ads/search`,
                method: 'GET',
                query: query,
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ads
         * @name AdsExecutionCreate
         * @summary Назначение исполнителем объявления
         * @request POST:/api/ads/{id}/execution
         */
        adsExecutionCreate: (id: number, params: RequestParams = {}) =>
            this.request<InlineResponse2012, void>({
                path: `/api/ads/${id}/execution`,
                method: 'POST',
                format: 'json',
                ...params,
            }),

        /**
         * No description
         *
         * @tags ads
         * @name AdsExecutionDelete
         * @summary Отказ быть исполнителем объявления
         * @request DELETE:/api/ads/{id}/execution
         */
        adsExecutionDelete: (id: number, params: RequestParams = {}) =>
            this.request<InlineResponse2012, void>({
                path: `/api/ads/${id}/execution`,
                method: 'DELETE',
                format: 'json',
                ...params,
            }),
    };
}
