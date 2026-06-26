import { mockNotes } from '@/data/mock-notes';
import type { Note } from '@/types/content';

export async function getNotes(): Promise<Note[]> {
  return mockNotes;
}

export async function getNoteBySlug(slug: string): Promise<Note | null> {
  return mockNotes.find((note) => note.slug === slug) ?? null;
}

export async function getRecentNotes(limit = 5): Promise<Note[]> {
  return [...mockNotes]
    .sort((a, b) => (b.createdDate ?? b.createdAt).localeCompare(a.createdDate ?? a.createdAt))
    .slice(0, limit);
}
