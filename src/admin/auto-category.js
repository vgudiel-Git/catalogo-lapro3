// Script para agregar automáticamente la categoría 'ofertas' cuando hay descuento

// Función que se ejecuta cuando cambia el campo de descuento
function handleDiscountChange() {
  const discountField = document.querySelector('[data-testid="discount-field-input"]');
  const categoryField = document.querySelector('[data-testid="category-field-input"]');
  
  if (!discountField || !categoryField) {
    // Si los campos no están disponibles aún, intentar de nuevo en 500ms
    setTimeout(handleDiscountChange, 500);
    return;
  }

  // Observar cambios en el campo de descuento
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
        updateCategoryBasedOnDiscount();
      }
    });
  });

  // Observar cambios en el valor del select
  discountField.addEventListener('change', updateCategoryBasedOnDiscount);
  
  // Configurar el observer
  observer.observe(discountField, {
    attributes: true,
    attributeFilter: ['value']
  });
}

// Función para actualizar las categorías basándose en el descuento
function updateCategoryBasedOnDiscount() {
  const discountField = document.querySelector('[data-testid="discount-field-input"]');
  const categoryField = document.querySelector('[data-testid="category-field-input"]');
  
  if (!discountField || !categoryField) return;
  
  const discountValue = discountField.value;
  const currentCategories = Array.from(categoryField.selectedOptions).map(option => option.value);
  
  // Si hay descuento (no es 'none') y no está ya en ofertas
  if (discountValue !== 'none' && !currentCategories.includes('ofertas')) {
    // Agregar 'ofertas' a las categorías seleccionadas
    const ofertasOption = categoryField.querySelector('option[value="ofertas"]');
    if (ofertasOption) {
      ofertasOption.selected = true;
      // Disparar evento de cambio para que el CMS detecte la actualización
      categoryField.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
  // Si no hay descuento (es 'none'), remover 'ofertas' automáticamente
  else if (discountValue === 'none' && currentCategories.includes('ofertas')) {
    const ofertasOption = categoryField.querySelector('option[value="ofertas"]');
    if (ofertasOption) {
      ofertasOption.selected = false;
      categoryField.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleDiscountChange);
} else {
  handleDiscountChange();
}

// También intentar inicializar después de un delay para asegurar que el CMS esté completamente cargado
setTimeout(handleDiscountChange, 2000);