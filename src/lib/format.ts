export function formatAuthors(authors?: ReadonlyArray<{ name: string }>): string {
  if (!authors || authors.length === 0) {
    return '著者未設定';
  }

  return authors.map((author) => author.name).join(', ');
}

export function clampProgress(value?: number): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}

export function excerpt(value?: string, length = 96): string {
  if (!value) {
    return '';
  }

  return value.length > length ? `${value.slice(0, length)}...` : value;
}
