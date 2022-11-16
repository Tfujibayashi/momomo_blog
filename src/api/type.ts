export type Option<T> = {
  method: T;
  headers: {
    'Content-Type': 'application/json';
    Authorization: string;
  };
  body?: string | FormData;
};

export type GrandChildren<A extends {}> = { [I in keyof A]: keyof A[I] }[keyof A];
export type Owns<A extends {}, S extends string | symbol | number> = {
  [I in keyof A]: S extends keyof A[I] ? I : never;
}[keyof A];
export type Get<A, K> = K extends keyof A ? A[K] : undefined;

export interface Schema {
  resource: {
    [path: string]: {
      [method: string]: {
        argument?: BodyInit | null | undefined | unknown;
        response: unknown;
        description: string;
      };
    };
  };
}

export type LimitOffset = {
  limit?: number;
  offset?: number;
};

export type ErrorResponse = {
  code: number;
  message: string;
};
