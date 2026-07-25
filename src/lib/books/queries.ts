import "server-only";

import { getMicroCMSClient } from "@/lib/microcms/client";
import { normalizeBook } from "@/lib/books/normalize";
import type { Book, MicroCMSBook } from "@/types/book";

const endpoint = "books";

export async function getBooks(): Promise<Book[]> {
  const response = await getMicroCMSClient().getList<MicroCMSBook>({
    endpoint,
    queries: { limit: 100 },
    customRequestInit: { cache: "no-store" },
  });

  return response.contents.map(normalizeBook);
}

export async function getAllBooks(): Promise<Book[]> {
  const contents = await getMicroCMSClient().getAllContents<MicroCMSBook>({
    endpoint,
    customRequestInit: { cache: "no-store" },
  });

  return contents.map(normalizeBook);
}

export async function getBook(contentId: string): Promise<Book> {
  const response = await getMicroCMSClient().getListDetail<MicroCMSBook>({
    endpoint,
    contentId,
    customRequestInit: { cache: "no-store" },
  });

  return normalizeBook(response);
}
