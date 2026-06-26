import { mockBooks } from '@/data/mock-books';
import type { Book } from '@/types/content';

export async function getBooks(): Promise<Book[]> {
  return mockBooks;
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  return mockBooks.find((book) => book.slug === slug) ?? null;
}

export async function getReadingBooks(): Promise<Book[]> {
  return mockBooks.filter((book) => book.status === 'reading');
}

export async function getAppliedBooks(): Promise<Book[]> {
  return mockBooks.filter((book) => book.appliedToWork);
}

export async function getRereadCandidates(): Promise<Book[]> {
  return mockBooks.filter((book) => (book.rereadValue ?? 0) >= 4);
}
