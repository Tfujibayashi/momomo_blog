// Rest API Client
// https://blog.wh-plus.co.jp/entry/2020/12/21/104033

import { ErrorResponse, GrandChildren, Owns, Schema } from '~/repositories/db/type';
import { API_ERROR, API_ERROR_TARGET, NETWORK_ERROR, NOT_FOUND_ERROR } from '~/constants';
import { ApiError, ErrorCode, ErrorMessage } from '~/models';
import authenticator from '~/util/authenticator';

export default class ApiClient<T extends Schema> {
  protected endpoint: string;

  constructor() {
    this.endpoint = process.env.ENDPOINT as string;
  }

  async call<
    Method extends GrandChildren<T['resource']>,
    Path extends Owns<T['resource'], Method>,
    Argument extends T['resource'][Path][Method]['argument'],
    Response extends T['resource'][Path][Method]['response'],
    Description extends T['resource'][Path][Method]['description'],
  >(
    method: Method,
    path: Path,
    argument?: Argument,
    description?: Description,
    isFormData = false,
  ): Promise<Response> {
    let appliedPath = path.toString();

    // Path + Query
    if (method === 'GET' && argument) {
      const queryString = this.toQueryString(argument);

      appliedPath = `${appliedPath}?${queryString}`;
    }

    // Auth Token
    const jwt = authenticator.user && (await authenticator.user.getIdToken());

    const option: RequestInit = {
      method: method as string,
      headers: {
        'Content-Type': 'application/json',
        Authorization: jwt ? `Bearer ${jwt}` : '',
      },
      body: isFormData ? (argument as FormData) : JSON.stringify(argument),
    };

    method === 'GET' && delete option.body;

    try {
      const response = await fetch(`${this.endpoint}${appliedPath}`, option);

      if (!response.ok) {
        const errorResponse = (await response.json()) as ErrorResponse;
        const errorMessage = API_ERROR[errorResponse.code].replace(
          'XX',
          API_ERROR_TARGET[errorResponse.message],
        );

        console.log(errorResponse);

        console.log(API_ERROR[errorResponse.code].replace('XX', errorResponse.message));

        const error = ApiError.create({
          e: new Error(NOT_FOUND_ERROR),
          code: ErrorCode.create(errorResponse.code),
          message: ErrorMessage.create(errorMessage),
        });

        throw error;
      }

      return (await response.json()) as Response;
    } catch (e) {
      if (e instanceof ApiError) throw e;

      const errorMessage = description ? `${description}に失敗` : NETWORK_ERROR;

      const error = ApiError.create({
        e: e as Error,
        code: ErrorCode.create(999997),
        message: ErrorMessage.create(errorMessage),
      });

      throw error;
    }
  }

  private toQueryString = <Argument extends {}>(value: Argument): string => {
    return Object.entries(value)
      .map((query) => {
        const key = query[0];
        const value = encodeURI(String(query[1]));

        if (value !== 'undefined') return `${key}=${value}`;
      })
      .filter(Boolean)
      .join('&');
  };
}
