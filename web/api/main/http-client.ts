import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { Options, QueueAddOptions } from 'p-queue';
import PQueue from 'p-queue';
import { useRequestsStore } from '@shared/store/requests';
import { LogoutReason, logout } from '@/auth';
import { useAppStore } from '~/store/app';

type RequestConfig = InternalAxiosRequestConfig & { id?: string };
type CustomResponse = AxiosResponse & { config: RequestConfig };
export type RequestError = AxiosError & { response: CustomResponse };

// Abort timeout in milliseconds
const ABORT_TIMEOUT_MS = 15000;

let queue = new PQueue({ concurrency: 5, intervalCap: 5, interval: 500, carryoverConcurrencyCount: true });

const api = axios.create({
  /** Set as localhost, baseURL is updated/changed by `./plugins.init-api.client.ts` */
  baseURL: 'http://localhost:1337',
  headers: {
    'x-ipy-http-client': 'ipy-http-client',
  },
});

export function onRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
  const requestsStore = useRequestsStore();
  const id = requestsStore.startRequest();

  function newAbortSignal(timeoutMs: number) {
    const abortController = new AbortController();
    setTimeout(() => {
      // abort controller
      abortController.abort();
    }, timeoutMs || 0);

    return abortController.signal;
  }

  const requestConfig: RequestConfig = {
    id,
    /* https://axios-http.com/docs/cancellation */
    signal: newAbortSignal(ABORT_TIMEOUT_MS),
    ...config,
  };

  return new Promise((resolve) => {
    // If the request is to login, we don't need to add the token to the headers.
    if (config.url && config.url === '/auth/v2/login')
      return resolve(requestConfig);

    queue.add(() => {
      // eslint-disable-next-line dot-notation
      requestConfig.headers['Authorization'] = api.defaults.headers.common['Authorization'];
      return resolve(requestConfig);
    });
  });
}

/**
 * This is the response handler for all requests.
 * The request queue is also integrated here.
 */
export function onResponse(response: AxiosResponse | CustomResponse): AxiosResponse | CustomResponse {
  const requestsStore = useRequestsStore();
  const id = (response.config as RequestConfig)?.id;
  if (id)
    requestsStore.endRequest(id);
  return response;
}

/**
 * This is the error handler for all requests.
 *
 * TODO: Nuxt shows it error page then navigates to the login page.
 *       Need to figure out how to prevent the error page from showing.
 */
export async function onError(error: RequestError): Promise<RequestError> {
  const requestsStore = useRequestsStore();
  const appStore = useAppStore();

  // Note: Cancelled requests don't respond with the config type, so we need to cast it
  const id = (error.response?.config as RequestConfig)?.id;

  if (id)
    requestsStore.endRequest(id);

  // If the request fails with a 401 unauthorized error, it's either
  // the session/token is expired, or the user does not have access.
  // When in case of the session/token expired, we'll need to force the app to logout and redirect to the login.
  const status = error.response?.status;

  // TODO: This is the current response from our /auth/v2/login endpoint.
  //       The response will change, once we get the new auth system in place.
  const code = error.response?.data?.code;

  // Handle timeout error
  if (
    status === 401
    && code === 'TOKEN_INVALID'
    && error.request.responseURL?.includes('/auth/v2/login') === false
  ) {
    // TODO: We don't have a refresh token mechanism yet, so we'll just logout the user.
    logout({ reason: LogoutReason.SESSION_EXPIRED, navigate: true });

    return Promise.reject(error);
  }

  else if (status >= 500 || status === undefined) {
    console.debug('must show error page or banner', status);
    const errorData = {
      reason: LogoutReason.SERVER_CONNECTION_ERROR,
    };

    const err: any = {
      status: status || 0,
      data: errorData,
      message: LogoutReason.SERVER_CONNECTION_ERROR,
    };

    // Let the state know that we have an error to show on the Error Banner
    appStore.error = err;

    // If the request was aborted, we'll need to throw an error
    // Usually, this happens when the request takes too long to respond
    // Or the request reached the ABORT_TIMEOUT_MS limit
    if (status === undefined && error.config?.signal?.aborted) {
      console.debug('[axios]: request timeout. status undefined');
      throw createError(err);
    }

    return Promise.reject(error);
  }
  else {
    console.debug('Non 500 Errors', status);

    // https://stackoverflow.com/questions/55758305/not-show-custom-error-page-when-request-failed
    return Promise.reject(error);
  }
}

// Axios request and response interceptors
api.interceptors.request.use(onRequest);
api.interceptors.response.use(onResponse, onError);

export default api;

export function resumeQueue() {
  if (!queue.isPaused)
    return;
  queue.start();
}

export async function replaceQueue(options?: Options<any, QueueAddOptions>) {
  await queue.onIdle();
  queue = new PQueue(options);
}
