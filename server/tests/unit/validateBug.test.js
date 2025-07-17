// tests/unit/validateBug.test.js
import { validateBugInput } from '../../utils/validateBug';


describe('validateBugInput', () => {
  it('should return true for valid title and description', () => {
    expect(validateBugInput({ title: 'Bug A', description: 'Detail' })).toBe(true);
  });

  it('should return false for empty title', () => {
    expect(validateBugInput({ title: '', description: 'Detail' })).toBe(false);
  });
});
