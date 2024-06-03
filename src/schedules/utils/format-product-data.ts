export const formatProductData = (data: any): any => {
  return {
    url: data.url,
    creator: data.creator,
    created_t: new Date(parseInt(data.created_t) * 1000),
    last_modified_t: new Date(parseInt(data.last_modified_t) * 1000),
    product_name: data.product_name,
    quantity: data.quantity,
    brands: data.brands,
    categories: data.categories,
    labels: data.labels,
    cities: data.cities,
    purchase_places: data.purchase_places,
    stores: data.stores,
    ingredients_text: data.ingredients_text,
    traces: data.traces,
    serving_size: data.serving_size,
    serving_quantity: parseFloat(data.serving_quantity) || 0,
    nutriscore_score: parseFloat(data.nutriscore_score) || 0,
    nutriscore_grade: data.nutriscore_grade,
    main_category: data.main_category,
    image_url: data.image_url,
    code: data.code// Remover aspas no início e fim e converter para número
  };
};
