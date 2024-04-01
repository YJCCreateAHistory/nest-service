export const HTTP_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
}

export const HTTP_OPTION = {
  SUCCESS: {
    code: HTTP_CODE.SUCCESS,
    message: 'success'
  },
  NO_AUTHORIZATION: {
    code: HTTP_CODE.UNAUTHORIZED,
    message: 'no_authorization'
  },
  BAD_REQUEST: {
    code: HTTP_CODE.BAD_REQUEST,
    message: 'bad_request'
  },
  NOT_FOUND: {
    code: HTTP_CODE.NOT_FOUND,
    message: 'not_found'
  },
  CONFLICT: {
    code: HTTP_CODE.CONFLICT,
    message: 'conflict'
  },
  INTERNAL_SERVER_ERROR: {
    code: HTTP_CODE.INTERNAL_SERVER_ERROR,
    message: 'internal_server_error'
  }
}