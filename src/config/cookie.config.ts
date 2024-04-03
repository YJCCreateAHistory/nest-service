import { registerAs, ConfigType } from "@nestjs/config"

export const cookieConfig = {
  httpOnly: true, // 设置为 true，客户端无法通过 JS 操作
  // signed: true, // 设置为 true，使用签名的 cookie，此时需要设置cookieParse
  maxAge: 1000 * 60 * 60 * 24 * 7, // 设置 cookie 过期时间
  secure: false, // 设置为 true，只有 https 请求才会发送给客户端
  sameSite: false, // 设置为 true，防止 CSRF 攻击
}

export const JwtExpiredConfig = registerAs('secuity', () => { 
  return {
    jwtExpired: 10000,
    refreshExpired: 10000,
  }
})

export type JwtExpiredConfigType = ConfigType<typeof JwtExpiredConfig>