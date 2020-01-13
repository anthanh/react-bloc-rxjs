import { Subject } from "rxjs";
import { generateProducts } from "./products.mock";

export function getProducts(page) {
  const subject = new Subject();
  setTimeout(() => {
    subject.next(generateProducts());
    subject.complete();
  }, 1000);
  return subject;
}
