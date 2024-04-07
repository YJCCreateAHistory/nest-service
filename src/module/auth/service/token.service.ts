import { Injectable, Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenEntity } from '../entity/token.entity'
import { Repository } from 'typeorm'
import { RefreshTokenEntity } from '../entity/refresh.entity'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { InjectRepository } from '@nestjs/typeorm'
import { Secret } from 'src/config/cookie.config'

@Injectable()
export class TokenService {

  constructor(
    @Inject(JwtService)
    private JwtService: JwtService,
    @InjectRepository(TokenEntity)
    private TokenRepository: Repository<TokenEntity>,
    @InjectRepository(RefreshTokenEntity)
    private RefreshTokenRepository: Repository<RefreshTokenEntity>,
  ) { }

  /**
  * @desc 生成token
  */
  async builderAccessToken(uid: string, phone: string) {

    const accessToken = await this.JwtService.signAsync({ uid, phone }, {
      secret: process.env.SECERT_KEY,
    })

    const repository = new TokenEntity()
    repository.uid = uid
    repository.accessToken = accessToken
    repository.create_at = new Date()
    repository.expired_at = Secret.jwtExpired
    await repository.save()

    const refreshToekn = await this.builderRefreshToken(repository)

    return {
      accessToken: accessToken,
      refreshToekn: refreshToekn
    }
  }

  /**
  * @desc 生成refreshToken
  */
  async builderRefreshToken(accessToken: TokenEntity) {

    const generateId = uuidv4()
    const refreshToekn = await this.JwtService.signAsync({ generateId }, {
      secret: process.env.REFRESH_SECERT_KEY,
    })
    const repository = new RefreshTokenEntity()
    repository.uid = uuidv4()
    repository.refreshToken = refreshToekn
    repository.create_at = new Date()
    repository.expired_at = Secret.jwtExpired
    repository.accessToken = accessToken
    await this.RefreshTokenRepository.save(repository)
    return refreshToekn
  }

  /**
   * @desc 校验token
  */
  async validateAccessToken(uid: string) {
    const token = await this.TokenRepository.findOne({
      where: {
        uid: uid
      },
      relations: ['user', 'refreshToken'],
      cache: true,
    })
    return Boolean(token)
  }

  /**
  * @desc 移除token
  */
  async removeAccessToken(uid: string) {
    const token = await this.TokenRepository.findOne({
      where: {
        uid: uid
      }
    })
    await token.remove()
  }

  /**
  * @desc 移除refreshToken
  */
  async removeRefreshToken(uid: string) {
    const token = await this.RefreshTokenRepository.findOne({
      where: {
        uid: uid
      }
    })
    await token.remove()
  }

  /**
   * @desc 刷新token
  */
  async refreshToken(uid: string, telephone: string) {
    const refreshToken = await this.RefreshTokenRepository.findOne({
      where: {
        uid: uid
      }
    })

    if (!refreshToken) return null

    const isAfter = dayjs().isAfter(refreshToken.expired_at)

    if (isAfter) return null

    const accessToken = this.builderAccessToken(uid, telephone)

    await refreshToken.remove()

    return accessToken

  }

}
