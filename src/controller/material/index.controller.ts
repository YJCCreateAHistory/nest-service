import { Controller, Get } from '@nestjs/common';
import { MaterialService } from '../../module/material/index.service'

@Controller('material')
export class MaterailController {

  constructor(private readonly materialService: MaterialService) { }

  @Get()
  async fetchMaterialResourceList() {
    const res = await this.materialService.fetchMaterialResourceList()
    return res
  }
}
