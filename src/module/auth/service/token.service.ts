import { Injectable, Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenEntity } from '../entity/token.entity'
import { Repository } from 'typeorm'
import { RefreshTokenEntity } from '../entity/refresh.entity'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class TokenService {

  constructor(
    @Inject(JwtService)
    private JwtService: JwtService,
    @InjectRepository(TokenEntity)
    private TokenRepository: Repository<TokenEntity>,
    @InjectRepository(RefreshTokenEntity)
    private RefreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {}

  async builderAccessToken(uid: string, phone: string) {

    const accessToken = await this.JwtService.signAsync({ uid, phone }, {
      secret: process.env.SECERT_KEY,
    })

    const repository = new TokenEntity()
    repository.uid = uid
    repository.accessToken = accessToken
    repository.create_at = new Date()
    repository.expired_at = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
    await repository.save()

    const refreshToekn = await this.builderRefreshToken(repository)

    return {
      accessToken: accessToken,
      refreshToekn: refreshToekn
    }
  }

  async builderRefreshToken(accessToken: TokenEntity) { 

    const generateId = uuidv4()
    const refreshToekn = await this.JwtService.signAsync({ generateId }, {
      secret: process.env.REFRESH_SECERT_KEY,
    })
    const repository = new RefreshTokenEntity()
    repository.uid = uuidv4()
    repository.refreshToken = refreshToekn
    repository.create_at = new Date()
    repository.expired_at = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
    repository.accessToken = accessToken
    await this.RefreshTokenRepository.save(repository)
    return refreshToekn
  }

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

  async removeAccessToken(uid: string) { 
    const token = await this.TokenRepository.findOne({
      where: {
        uid: uid
      }
    })
    await token.remove()
  }

  async removeRefreshToken(uid: string) { 
    const token = await this.RefreshTokenRepository.findOne({
      where: {
        uid: uid
      }
    })
    await token.remove()
  }

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
