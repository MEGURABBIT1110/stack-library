import Link from "next/link";

import { Heading } from "@/components/common/Heading";
import {
  aggregateLibraryBank,
  formatRegisteredPrice,
} from "@/lib/books/bank";
import type { Book } from "@/types/book";

type LibraryBankProps = {
  books?: readonly Book[];
  error?: boolean;
};

function Value({
  children,
  unavailable = false,
}: {
  children: string;
  unavailable?: boolean;
}) {
  return (
    <span className="bank-value" data-unavailable={unavailable || undefined}>
      {children}
    </span>
  );
}

export function LibraryBank({
  books = [],
  error = false,
}: LibraryBankProps) {
  if (error) {
    return (
      <section className="bank-message" role="alert">
        <h1>価格台帳を読み込めませんでした</h1>
        <p>
          microCMSとの通信に失敗したため、登録価格の集計結果を表示できません。
        </p>
        <Link className="text-link" href="/">
          蔵書一覧へ戻る
        </Link>
      </section>
    );
  }

  const aggregate = aggregateLibraryBank(books);
  const hasBooks = aggregate.bookCount > 0;
  const hasRegisteredPrices = aggregate.registeredCount > 0;

  return (
    <div className="library-bank">
      <header className="bank-introduction">
        <h1>価格台帳</h1>
      </header>

      {!hasBooks ? (
        <section className="bank-message" aria-labelledby="bank-empty-title">
          <h2 id="bank-empty-title">集計する蔵書がありません</h2>
          <p>
            技術書を登録すると、ここに価格台帳が表示されます。
          </p>
        </section>
      ) : (
        <>
          <section aria-label="登録価格の集計" className="bank-summary-section">
            <dl className="bank-summary">
              <div className="bank-summary__total">
                <dt>登録価格の合計</dt>
                <dd>
                  <Value unavailable={!hasRegisteredPrices}>
                    {formatRegisteredPrice(aggregate.totalPrice)}
                  </Value>
                </dd>
              </div>
              <div className="bank-summary__count">
                <dt>価格登録済み</dt>
                <dd>
                  <Value>{`${aggregate.registeredCount}冊`}</Value>
                </dd>
              </div>
              <div className="bank-summary__count">
                <dt>価格未登録</dt>
                <dd>
                  <Value>{`${aggregate.unregisteredCount}冊`}</Value>
                </dd>
              </div>
            </dl>
            {!hasRegisteredPrices && (
              <p className="bank-summary__notice" role="status">
                登録価格はまだありません。合計は未登録として扱います。
              </p>
            )}
          </section>

          <section aria-labelledby="bank-books-title" className="bank-ledger">
            <div className="bank-ledger__heading">
              <Heading as="h2" id="bank-books-title" scale="subsection">
                書籍別の登録価格
              </Heading>
            </div>
            <div className="bank-table-wrap">
              <table className="bank-table bank-table--books">
                <caption className="visually-hidden">
                  蔵書ごとの書名、出版社、登録価格
                </caption>
                <thead>
                  <tr>
                    <th scope="col">書名</th>
                    <th scope="col">出版社</th>
                    <th scope="col">登録価格</th>
                  </tr>
                </thead>
                <tbody>
                  {aggregate.books.map((book) => (
                    <tr key={book.contentId}>
                      <th scope="row">
                        <Link href={`/books/${book.contentId}`}>
                          {book.title}
                        </Link>
                      </th>
                      <td>{book.publisher || "未登録"}</td>
                      <td>
                        <Value unavailable={book.price === undefined}>
                          {formatRegisteredPrice(book.price)}
                        </Value>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
