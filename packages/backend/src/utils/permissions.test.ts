import { hasPermission, canEditEdea } from './permissons';

describe('Permissions', () => {
  it('should return true if the user has the permission', () => {
    expect(hasPermission({ permissions: ['BLOCK_IDEA'], id: '1' }, 'BLOCK_IDEA')).toBe(true);
  });

  it('should return false if the user does not have the permission', () => {
    expect(hasPermission({ permissions: [], id: '1' }, 'BLOCK_IDEA')).toBe(false);
  });

  it('should return true if the user has the permission', () => {
    expect(hasPermission({ permissions: ['ALL'], id: '1' }, 'BLOCK_IDEA')).toBe(true);
  });

  it('only author can edit idea', () => {
    expect(canEditEdea({ id: '1', permissions: [] }, { authorId: '2' })).toBe(false);
    expect(canEditEdea({ id: '1', permissions: [] }, { authorId: '1' })).toBe(true);
  });
});
