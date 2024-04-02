import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {

  constructor(
    private readonly JwtService: JwtService
  ) { }

  builderAccessToken() { 

  }

  builderRefreshToken() { 

  }

  validateAccessToken() { 
    
  }

  removeAccessToken() { 

  }

  removeRefreshToken() { 

  }

  refreshToken() { 

  }

}
