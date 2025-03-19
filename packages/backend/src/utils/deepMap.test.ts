import { deepMap } from '../utils/deepMap';

describe('deepMap', () => {
  // Test case for simple objects
  it('should map values in a simple object', () => {
    const input = { name: 'John', age: 30 };
    const result = deepMap(input, ({ value }) => {
      return typeof value === 'number' ? value * 2 : value;
    });

    expect(result).toEqual({ name: 'John', age: 60 });
  });

  // Test case for nested objects
  it('should map values in nested objects', () => {
    const input = {
      user: {
        name: 'John',
        details: {
          age: 30,
          email: 'john@example.com',
        },
      },
    };

    const result = deepMap(input, ({ key, value }) => {
      return key === 'email' ? '***' : value;
    });

    expect(result).toEqual({
      user: {
        name: 'John',
        details: {
          age: 30,
          email: '***',
        },
      },
    });
  });

  // Test case for arrays
  it('should map values in arrays', () => {
    const input = [1, 2, 3, 4];

    const result = deepMap(input, ({ value }) => {
      return typeof value === 'number' ? value * 2 : value;
    });

    expect(result).toEqual([2, 4, 6, 8]);
  });

  // Test case for objects containing arrays
  it('should map values in objects containing arrays', () => {
    const input = {
      name: 'John',
      scores: [85, 90, 95],
      contacts: [
        { type: 'email', value: 'john@example.com' },
        { type: 'phone', value: '123-456-7890' },
      ],
    };

    const result = deepMap(input, ({ key, value }) => {
      if (key === 'value' && typeof value === 'string' && (value.includes('@') || value.includes('-'))) {
        return '***';
      }
      return value;
    });

    expect(result).toEqual({
      name: 'John',
      scores: [85, 90, 95],
      contacts: [
        { type: 'email', value: '***' },
        { type: 'phone', value: '***' },
      ],
    });
  });

  // Test case for null and undefined values
  it('should handle null and undefined values', () => {
    const input = {
      name: null,
      age: undefined,
      address: {
        street: null,
        city: undefined,
      },
    };

    const result = deepMap(input, ({ value }) => value);

    expect(result).toEqual(input);
  });

  // Test case for the specific use case of masking sensitive data
  it('should mask sensitive data fields', () => {
    const input = {
      username: 'johndoe',
      email: 'john@example.com',
      password: 'secret123',
      profile: {
        description: 'This is my bio',
        token: 'abc123xyz',
        preferences: {
          theme: 'dark',
          newPassword: 'newsecret123',
          oldPassword: 'oldsecret123',
        },
      },
      notes: [
        { title: 'Note 1', text: 'Secret note content' },
        { title: 'Note 2', text: 'More secret content' },
      ],
    };

    const result = deepMap(input, ({ key, value }) => {
      if (['email', 'password', 'newPassword', 'oldPassword', 'token', 'text', 'description'].includes(key)) {
        return '***';
      }
      return value;
    });

    expect(result).toEqual({
      username: 'johndoe',
      email: '***',
      password: '***',
      profile: {
        description: '***',
        token: '***',
        preferences: {
          theme: 'dark',
          newPassword: '***',
          oldPassword: '***',
        },
      },
      notes: [
        { title: 'Note 1', text: '***' },
        { title: 'Note 2', text: '***' },
      ],
    });
  });

  // Test case for empty objects and arrays
  it('should handle empty objects and arrays', () => {
    expect(deepMap({}, ({ value }) => value)).toEqual({});
    expect(deepMap([], ({ value }) => value)).toEqual([]);
  });

  // Test for non-object input
  it('should return primitive values unchanged', () => {
    expect(deepMap(42, ({ value }) => (typeof value === 'number' ? value * 2 : value))).toEqual(84);
    expect(deepMap('hello', ({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))).toEqual('HELLO');
    expect(deepMap(true, ({ value }) => (value !== null && value !== undefined ? !value : value))).toEqual(false);
  });

  // Test for circular references
  it('should handle circular references without stack overflow', () => {
    // Create an object with a circular reference
    const circular: any = {
      name: 'Circular Object',
      value: 42,
    };
    circular.self = circular; // Direct circular reference

    // Create a more complex object with nested circular references
    const parent: any = {
      name: 'Parent',
      child: {
        name: 'Child',
        data: [1, 2, 3],
      },
    };
    parent.child.parent = parent; // Indirect circular reference

    // Test that deepMap doesn't throw an error due to maximum call stack size exceeded
    expect(() => {
      deepMap(circular, ({ value }) => value);
    }).not.toThrow();

    expect(() => {
      deepMap(parent, ({ value }) => value);
    }).not.toThrow();

    // Verify that the transformation was applied correctly to non-circular parts
    const result = deepMap(circular, ({ key, value }) => {
      if (key === 'value' && typeof value === 'number') {
        return value * 2;
      }
      return value;
    }) as typeof circular;

    expect(result.name).toEqual('Circular Object');
    expect(result.value).toEqual(84);
    // The self reference should be there but we don't need to check its contents
    expect(result.self).toBeDefined();
  });
});
