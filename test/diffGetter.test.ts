import { generateUnifiedDiff } from '../src/diffGetter';

describe('generateUnifiedDiff', () => {
  it('should return an empty string when there are no changes', () => {
    const oldString = 'Hello World';
    const newString = 'Hello World';
    const result = generateUnifiedDiff(oldString, newString);
    expect(result).toBe('');
  });

  it('should generate a unified diff for changed content', () => {
    const oldString = 'Hello World';
    const newString = 'Hello GitHub Copilot';
    const result = generateUnifiedDiff(oldString, newString);
    expect(result).toContain('Hello World');
    expect(result).toContain('Hello GitHub Copilot');
  });

  it('should include headers in the diff', () => {
    const oldString = 'Hello World';
    const newString = 'Hello GitHub Copilot';
    const oldHeader = 'v1';
    const newHeader = 'v2';
    const result = generateUnifiedDiff(oldString, newString, oldHeader, newHeader);
    expect(result).toContain('--- 	v1');
    expect(result).toContain('+++ 	v2');
  });

  it('should include file name in the diff', () => {
    const oldString = 'Hello World';
    const newString = 'Hello GitHub Copilot';
    const fileName = 'testFile.txt';
    const result = generateUnifiedDiff(oldString, newString, '', '', fileName);
    expect(result).toContain('--- testFile.txt');
    expect(result).toContain('+++ testFile.txt');
  });
});