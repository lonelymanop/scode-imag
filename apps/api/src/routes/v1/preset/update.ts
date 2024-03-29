import {FastifyPluginAsyncTypebox} from '@fastify/type-provider-typebox';
import {Type} from '@sinclair/typebox';
import {GetApiTypes} from '../../../common/types/extract-api-types.js';
import {PresetDtoSchema} from '../../../modules/preset/schema/preset-dto.schema.js';
import {PresetUpdateDtoSchema} from '../../../modules/preset/schema/preset-update-dto.schema.js';

const schema = {
  tags: ['Preset'],
  summary: 'Update a existing CodeImage preset by id',
  body: PresetUpdateDtoSchema,
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: PresetDtoSchema,
  },
};

export type UpdatePresetApi = GetApiTypes<typeof schema>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateRoute: FastifyPluginAsyncTypebox = async fastify => {
  fastify.put(
    '/:id',
    {
      preValidation: (req, reply) => fastify.authorize(req, reply),
      schema,
    },
    request => {
      const {
        appUser,
        params: {id},
        body,
      } = request;
      return fastify.presetService.updatePreset(appUser.id, id, body);
    },
  );
};
export default updateRoute;
