import Link from "next/link";

import {
  aggregateLibraryBank,
  formatRegisteredPrice,
  formatRegistrationRate,
} from "@/lib/books/bank";
import {
  READING_STATUS_DEFINITIONS,
  READING_STATUS_LABELS,
} from "@/lib/books/labels";
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

export function LibraryBank(props: LibraryBankProps) {
  if (props.error) {
    return (
      <section className="bank-message" role="alert">
        <p className="section-code">LIBRARY BANK / CONNECTION ERROR</p>
        <h1>Library Bankを読み込めませんでした</h1>
        <p>
          microCMSとの通信に失敗したため、登録価格の集計結果を表示できません。
        </p>
        <Link className="text-link" href="/">
          蔵書一覧へ戻る
        </Link>
      </section>
    );
  }

  const aggregate = aggregateLibraryBank(props.books ?? []);
  const hasBooks = aggregate.bookCount > 0;
  const hasRegisteredPrices = aggregate.registeredCount > 0;

  return (
    <div className="library-bank">
      <header className="bank-introduction">
        <p className="section-code">LIBRARY BANK / REGISTERED PRICE LEDGER</p>
        <h1>Library Bank</h1>
        <p>
          蔵書に登録した税込価格を集計する台帳です。市場価格・買取価格・資産価値ではありません。
        </p>
      </header>

      {!hasBooks ? (
        <section className="bank-message" aria-labelledby="bank-empty-title">
          <p className="section-code">LEDGER / EMPTY</p>
          <h2 id="bank-empty-title">集計する蔵書がありません</h2>
          <p>microCMSに技術書を登録すると、ここに価格台帳が表示されます。</p>
        </section>
      ) : (
        <>
          {!hasRegisteredPrices && (
            <section className="bank-notice" aria-labelledby="bank-unregistered-title">
              <h2 id="bank-unregistered-title">登録価格はまだありません</h2>
              <p>
                蔵書は{aggregate.bookCount}冊ありますが、価格が登録された本は0冊です。
                金額は未登録として表示します。
              </p>
            </section>
          )}

          {hasRegisteredPrices && aggregate.unregisteredCount > 0 && (
            <p className="bank-notice" role="status">
              {aggregate.unregisteredCount}冊は価格未登録です。集計値は価格登録済みの
              {aggregate.registeredCount}冊のみを対象にしています。
            </p>
          )}

          <section aria-labelledby="bank-summary-title" className="bank-section">
            <div className="bank-section__heading">
              <div>
                <p className="section-code">LEDGER / SUMMARY</p>
                <h2 id="bank-summary-title">登録価格の集計</h2>
              </div>
              <p>{aggregate.bookCount}冊を確認</p>
            </div>
            <dl className="bank-summary">
              <div>
                <dt>登録価格 合計</dt>
                <dd>
                  <Value unavailable={!hasRegisteredPrices}>
                    {formatRegisteredPrice(aggregate.totalPrice)}
                  </Value>
                </dd>
              </div>
              <div>
                <dt>価格登録済み</dt>
                <dd>
                  <Value>{`${aggregate.registeredCount}冊`}</Value>
                </dd>
              </div>
              <div>
                <dt>価格未登録</dt>
                <dd>
                  <Value>{`${aggregate.unregisteredCount}冊`}</Value>
                </dd>
              </div>
              <div>
                <dt>価格登録率</dt>
                <dd>
                  <Value>{formatRegistrationRate(aggregate.registrationRate)}</Value>
                </dd>
              </div>
              <div>
                <dt>登録価格 平均</dt>
                <dd>
                  <Value unavailable={!hasRegisteredPrices}>
                    {formatRegisteredPrice(aggregate.averagePrice)}
                  </Value>
                </dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="bank-status-title" className="bank-section">
            <div className="bank-section__heading">
              <div>
                <p className="section-code">LEDGER / READING STATUS</p>
                <h2 id="bank-status-title">読書状態別</h2>
              </div>
            </div>
            <div className="bank-table-wrap">
              <table className="bank-table bank-table--status">
                <caption className="visually-hidden">
                  読書状態ごとの蔵書数、価格登録済み冊数、登録価格合計
                </caption>
                <thead>
                  <tr>
                    <th scope="col">読書状態</th>
                    <th scope="col">蔵書数</th>
                    <th scope="col">価格登録済み</th>
                    <th scope="col">登録価格 合計</th>
                  </tr>
                </thead>
                <tbody>
                  {READING_STATUS_DEFINITIONS.map(({ id }) => {
                    const row = aggregate.byStatus.find(({ status }) => status === id);
                    if (!row) return null;
                    return (
                      <tr key={id}>
                        <th data-label="読書状態" scope="row">
                          {READING_STATUS_LABELS[id]}
                        </th>
                        <td data-label="蔵書数">{row.bookCount}冊</td>
                        <td data-label="価格登録済み">{row.registeredCount}冊</td>
                        <td data-label="登録価格 合計">
                          <Value unavailable={row.totalPrice === undefined}>
                            {row.bookCount === 0
                              ? "対象なし"
                              : formatRegisteredPrice(row.totalPrice)}
                          </Value>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="bank-books-title" className="bank-section">
            <div className="bank-section__heading">
              <div>
                <p className="section-code">LEDGER / BOOK ENTRIES</p>
                <h2 id="bank-books-title">蔵書別の登録価格</h2>
              </div>
              <p>登録価格の高い順・未登録は末尾</p>
            </div>
            <div className="bank-table-wrap">
              <table className="bank-table bank-table--books">
                <caption className="visually-hidden">
                  蔵書ごとの書名、著者、読書状態、登録価格
                </caption>
                <thead>
                  <tr>
                    <th scope="col">蔵書</th>
                    <th scope="col">読書状態</th>
                    <th scope="col">登録価格（税込）</th>
                  </tr>
                </thead>
                <tbody>
                  {aggregate.books.map((book) => (
                    <tr key={book.contentId}>
                      <th data-label="蔵書" scope="row">
                        <Link href={`/books/${book.contentId}`}>
                          <span>{book.title}</span>
                          <small>{book.authors.join("、") || "著者不明"}</small>
                        </Link>
                      </th>
                      <td data-label="読書状態">
                        {READING_STATUS_LABELS[book.readingStatus]}
                      </td>
                      <td data-label="登録価格（税込）">
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
