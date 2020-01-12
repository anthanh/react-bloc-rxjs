import { Subject } from "rxjs";
import { generateProducts } from "./products.mock";

const subject = new Subject();
export function getProducts(page) {
  setTimeout(() => {
    subject.next(generateProducts());
    subject.complete();
  }, 1000);
  return subject;
}
