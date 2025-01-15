import { pick } from 'lodash';
import { ideas, trpc } from '../../lib';

export const getIdeasTrpcRoute = trpc.procedure.query(() => {
  return ideas.map((idea) => pick(idea, ['nick', 'name', 'description']));
});
