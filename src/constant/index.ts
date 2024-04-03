export enum RespCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  NULL = 0,
  EXIST = 1001,
}

export const Resp = {
  SUCCESS: {
    error_code: RespCode.SUCCESS,
    message: 'SUCCESS',
    data: true
  },
  NO_AUTHORIZATION: {
    error_code: RespCode.UNAUTHORIZED,
    message: 'NO_AUTHORIZATION',
    data: null
  },
  BAD_REQUEST: {
    error_code: RespCode.BAD_REQUEST,
    message: 'BAD_REQUEST',
    data: null
  },
  NOT_FOUND: {
    error_code: RespCode.NOT_FOUND,
    message: 'NOT_FOUND',
    data: null
  },
  CONFLICT: {
    error_code: RespCode.CONFLICT,
    message: 'CONFLICT',
    data: null
  },
  INTERNAL_SERVER_ERROR: {
    error_code: RespCode.INTERNAL_SERVER_ERROR,
    message: 'INTERNAL_SERVER_ERROR',
    data: null
  },
  NULL: {
    error_code: RespCode.NULL,
    data: null,
    message: 'SUCCESS'
  },
  EXIST: {
    error_code: RespCode.EXIST,
    data: null,
    message: 'EXIST'
  }
}
