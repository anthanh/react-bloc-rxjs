import { Subject } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { generateProducts } from "./products.mock";

export function getProducts(page) {
  const subject = new Subject().pipe(shareReplay(1));
  setTimeout(() => {
    subject.next(generateProducts());
  }, 1000);
  return subject;
}
