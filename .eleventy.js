module.exports = function(eleventyConfig) { 
  // Copy CSS and images to _site
  eleventyConfig.addPassthroughCopy("src/assets");
  // Copy admin folder to _site
  eleventyConfig.addPassthroughCopy("src/admin");

  // Create products collection with automatic 'ofertas' category for discounted products
  eleventyConfig.addCollection("products", function(collectionApi) {
    const products = collectionApi.getFilteredByGlob("src/products/*.{md,html}");
    
    // Process each product to add 'ofertas' category if it has discount
    products.forEach(product => {
      const discount = product.data.discount;
      let category = product.data.category;
      
      // If product has discount and it's not 'none'
      if (discount && discount !== 'none') {
        // Ensure category is an array
        if (!Array.isArray(category)) {
          category = category ? [category] : [];
        }
        
        // Add 'ofertas' if not already present
        if (!category.includes('ofertas')) {
          category.unshift('ofertas'); // Add at the beginning
          product.data.category = category;
        }
      }
    });
    
    return products;
  });
  
  // Definir categorías como datos globales
  const categoriesData = [
    { label: "Ofertas", value: "ofertas" },
    { label: "Ropa & Calzado", value: "ropa-calzado" },
    { label: "Accesorios", value: "accesorios" },
    { label: "Mascotas", value: "mascotas" },
    { label: "Hogar", value: "hogar" },
    { label: "Electrodomésticos", value: "electrodomesticos" },
    { label: "Juguetes", value: "juguetes" },
    { label: "Deportes", value: "deportes" },
    { label: "Tecnología", value: "tecnologia" },
    { label: "Temporada", value: "temporada" }
  ];
  
  // Añadir datos globales para categorías
  eleventyConfig.addGlobalData("categories", categoriesData);
  
  // Crear colecciones por categoría
  categoriesData.forEach(category => {
    eleventyConfig.addCollection(`category-${category.value}`, function(collectionApi) {
      return collectionApi.getFilteredByGlob("src/products/*.{md,html}").filter(item => {
        const itemCategory = item.data.category;
        // Manejar tanto strings como arrays de categorías
        if (Array.isArray(itemCategory)) {
          return itemCategory.includes(category.value);
        }
        return itemCategory === category.value;
      });
    });
  });
  
  // Añadir filtro para obtener la etiqueta de una categoría por su valor
  eleventyConfig.addNunjucksFilter("getCategoryLabel", function(categoryValue) {
    const category = categoriesData.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  });
  
  // Añadir filtro para formatear precios con comas en los millares y dos decimales
  eleventyConfig.addNunjucksFilter("formatPrice", function(price) {
    // Convertir a número si es string
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    // Formatear con comas en los millares y dos decimales
    return numPrice.toLocaleString('es-GT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  });
  
  // Añadir filtro para calcular el precio con descuento
  eleventyConfig.addNunjucksFilter("calculateDiscountPrice", function(price, discount, customPrice) {
    // Si no hay descuento, retornar null
    if (!discount || discount === 'none') {
      return null;
    }
    
    // Convertir a número si es string
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    // Si es precio personalizado, retornar ese precio
    if (discount === 'custom' && customPrice) {
      return typeof customPrice === 'string' ? parseFloat(customPrice) : customPrice;
    }
    
    // Calcular el descuento según el porcentaje
    const discountPercent = parseInt(discount, 10);
    if (!isNaN(discountPercent)) {
      return numPrice * (1 - discountPercent / 100);
    }
    
    return null;
  });
  
  // Filtro duplicado eliminado - se usa el definido arriba que incluye todas las categorías

  // Enforce unique permalink for all product files
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: data => {
      // Only apply to markdown files in the products folder
      if (data.page && data.page.inputPath && data.page.inputPath.includes("/products/")) {
        return `/products/${data.page.fileSlug}/index.html`;
      }
      return data.permalink; // fallback to front matter or default
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};