export enum HTTP_CODE  {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED =401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  NULL = 0,
  EXIST = 1001,
}

export const HTTP_OPTION = {
  SUCCESS: {
    error_code: HTTP_CODE.SUCCESS,
    message: 'SUCCESS',
    data: true
  },
  NO_AUTHORIZATION: {
    error_code: HTTP_CODE.UNAUTHORIZED,
    message: 'NO_AUTHORIZATION',
    data: null
  },
  BAD_REQUEST: {
    error_code: HTTP_CODE.BAD_REQUEST,
    message: 'BAD_REQUEST',
    data: null
  },
  NOT_FOUND: {
    error_code: HTTP_CODE.NOT_FOUND,
    message: 'NOT_FOUND',
    data: null
  },
  CONFLICT: {
    error_code: HTTP_CODE.CONFLICT,
    message: 'CONFLICT',
    data: null
  },
  INTERNAL_SERVER_ERROR: {
    error_code: HTTP_CODE.INTERNAL_SERVER_ERROR,
    message: 'INTERNAL_SERVER_ERROR',
    data: null
  },
  NULL: {
    error_code: HTTP_CODE.NULL,
    data: null,
    message: 'SUCCESS'
  },
  EXIST: {
    error_code: HTTP_CODE.EXIST,
    data: null,
    message: 'EXIST'
  }
}
