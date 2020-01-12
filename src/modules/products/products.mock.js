const productMock = {
  id: "product",
  name: "product",
  price: 5
};

export function generateProducts(amount = 5) {
  return Array.apply(null, Array(amount)).map((_, index) => ({
    id: `${productMock.name}${index}`,
    name: `${productMock.name} ${index}`,
    price: Math.floor(Math.random() * 100)
  }));
}
