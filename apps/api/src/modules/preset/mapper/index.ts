import {Preset} from '@codeimage/prisma-models';
import {PresetDataDto, PresetDto} from '../schema/preset-dto.schema.js';

export interface PresetMapper {
  fromEntityToDto(entity: Preset): PresetDto;
}

export class PresetMapper implements PresetMapper {
  fromEntityToDto(entity: Preset): PresetDto {
    return {
      id: entity.id,
      name: entity.name,
      version: Number(entity.version),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      data: entity.data as PresetDataDto,
    } as const;
  }
}
