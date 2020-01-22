// flatten
export function flattenProducts(data) {
  return data.map(item => {
    // claudinary
    let image = (item.image && item.image.url) || null;
    // local setup no deployment
    // const image = `${url}${item.image.url}`;
    return { ...item, image };
  });
}

// helper functions
export function featuredProducts(data) {
  return data.filter(item => {
    return item.featured === true;
  });
}

// paginate
export function paginate(products) {
  const itemPerPage = 4;
  const numberOfPage = Math.ceil(products.length / itemPerPage);

  // const newProducts = Array.from({ length: numberOfPage }, () => {
  //   return products.splice(0, itemPerPage);
  // });

  const newProducts = Array.from({ length: numberOfPage }, (_, index) => {
    const start = index * itemPerPage;
    return products.slice(start, start + itemPerPage);
  });
  return newProducts;
}
