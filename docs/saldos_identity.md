# Saldos Del Viajero Product Card Identity Manual

## Overview
This document serves as a comprehensive guide to product card design, typography, and animations for Saldos Del Viajero's digital properties. These guidelines ensure consistency across all product displays, particularly on offers and promotions pages.

## Product Card Examples

### Standard Product Card Structure
Product cards on Saldos Del Viajero follow a consistent design language that emphasizes visual hierarchy, clear pricing information, and compelling calls to action.

Key components:
- Image container with badge
- Category label
- Product title
- Product description
- Price display (current, original, discount)
- CTA button

### Key Design Elements
- **Image Container**: Fixed height with overflow hidden for consistent sizing
- **Badges**: Positioned in top-left corner with bold styling to highlight special offers
- **Category Label**: Uppercase, colored text to quickly identify product type
- **Title**: Limited to two lines with ellipsis for consistency
- **Description**: Limited to three lines with ellipsis to maintain card height
- **Price Display**: Clear visual hierarchy with current price emphasized
- **CTA Button**: Full-width, prominent button with hover effects

## Product Card Typography

### Font Family Specifications
Saldos Del Viajero uses a combination of Montserrat for headings and Open Sans for body text.

**Primary Font: Montserrat**
- Regular (400) - Used for some body text
- Medium (500) - Used for category labels
- Semi-Bold (600) - Used for product titles and badges
- Bold (700) - Used for prices and key information

**Secondary Font: Open Sans**
- Regular (400) - Used for product descriptions
- Semi-Bold (600) - Used occasionally for emphasis

### Font Size Specifications

**Badge Text**
- Size: 0.8rem (12.8px)
- Style: Montserrat Semi-Bold, Uppercase

**Category Label**
- Size: 0.9rem (14.4px)
- Style: Montserrat Medium, Uppercase

**Product Title**
- Size: 1.2rem (19.2px)
- Style: Montserrat Semi-Bold

**Product Description**
- Size: 0.95rem (15.2px)
- Style: Open Sans Regular

**Current Price**
- Size: 1.4rem (22.4px)
- Style: Montserrat Bold

**Original Price**
- Size: 1rem (16px)
- Style: Open Sans Regular

**Discount Percentage**
- Size: 0.9rem (14.4px)
- Style: Montserrat Semi-Bold

**CTA Button**
- Size: 1rem (16px)
- Style: Montserrat Semi-Bold

## Product Card Animations

Saldos Del Viajero employs subtle but effective animations to enhance user experience and draw attention to interactive elements.

### Hover Animations

**Card Hover Effect**
- Property: transform (translateY)
- Value: -5px
- Duration: 0.3s
- Easing: ease
- Description: The entire card lifts up slightly when hovered, creating a sense of interactivity and depth.

**Image Zoom Effect**
- Property: transform (scale)
- Value: 1.05
- Duration: 0.3s
- Easing: ease
- Description: The product image subtly zooms in when the card is hovered, drawing attention to the product.

**Shadow Enhancement**
- Property: box-shadow
- Value: 0 8px 25px rgba(0, 0, 0, 0.1)
- Duration: 0.3s
- Easing: ease
- Description: The shadow becomes more pronounced when hovering, enhancing the elevation effect.

**Button Hover Effect**
- Properties: background-color, transform
- Values: Darker shade, translateY(-2px)
- Duration: 0.3s
- Easing: ease
- Description: The CTA button darkens and lifts slightly when hovered, providing clear feedback.

**Badge Pulse Animation**
- Animation: pulse
- Duration: 2s infinite
- Description: Special offer badges may have a subtle pulsing animation to draw attention to promotions.

### CSS Transition Properties
```css
/* Global transition variable */
:root {
    --transition-speed: 0.3s;
}

/* Card transition properties */
.product-card {
    transition: all var(--transition-speed) ease;
}

/* Specific property transitions for performance */
.product-card {
    transition: transform var(--transition-speed) ease, 
                box-shadow var(--transition-speed) ease;
}

.product-image {
    transition: transform var(--transition-speed) ease;
}

.cta-button {
    transition: all var(--transition-speed) ease;
}