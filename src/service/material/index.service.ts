import { Inject, Injectable, Optional } from '@nestjs/common';

@Injectable()
export class MaterialService {
  
  constructor(@Optional() @Inject('HTTP_TOKEN') private readonly token?: string) {}

  async fetchMaterialResourceList() { 
    return {
      status: 200,
      data: []
    }
  }

}
