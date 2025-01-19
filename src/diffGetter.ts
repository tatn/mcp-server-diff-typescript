import { diffLines, createPatch } from 'diff';

export function generateUnifiedDiff(oldString: string, newString: string, oldHeader: string = '', newHeader: string = '', fileName: string = ''): string {
  const diff = diffLines(oldString, newString);
  if (diff.length === 1 && !diff[0].added && !diff[0].removed) {
    return ''; // No change detected
  }
  return createPatch(fileName, oldString, newString, oldHeader, newHeader, { context: 3 });
}
