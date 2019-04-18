import { any2string } from '../utils';

describe('any2string', () => {
  it('empty', () => {
    expect(any2string({})).toBe('');
    expect(any2string([])).toBe('');
    expect(any2string(true)).toBe('');
    expect(any2string(false)).toBe('');
    expect(any2string(null)).toBe('');
  });

  it('object array', () => {
    expect(any2string({ a: 'h', b: 'j' })).toBe('hj');
    expect(any2string({ a: ['a', 'b'], b: 'j' })).toBe('abj');
    expect(any2string({ a: ['a', { hah: 'ha' }], b: 'j' })).toBe('ahaj');
  });
});
