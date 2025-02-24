import { Idea, User, UserPermissions } from '@prisma/client';

type MaybeUser = Pick<User, 'id' | 'permissions'> | null | undefined;
type MaybeIdea = Pick<Idea, 'authorId'> | null | undefined;

const hasPermission = (user: MaybeUser, permission: UserPermissions) => {
  return user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false;
};

export const canBlockIdeas = (user: MaybeUser) => {
  return hasPermission(user, 'BLOCK_IDEA');
};

export const canEditEdea = (user: MaybeUser, idea: MaybeIdea) => {
  return !!user && !!idea && idea?.authorId === user?.id;
};
