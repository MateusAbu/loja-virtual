import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './Card';

describe('ProductCard', () => {
    const product = {
        id: 1,
        title: 'Product Title',
        price: 10,
        description: 'Product Description',
        category: 'Product Category',
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: {
            count: 5,
            rate: 4.5,
        },
    };

    test('renders product title', () => {
        render(<ProductCard product={product} />);
        const titleElement = screen.getByText('Product Title');
        expect(titleElement).toBeInTheDocument();
    });

    test('renders product price', () => {
        render(<ProductCard product={product} />);
        const priceElement = screen.getByText('Price: $10');
        expect(priceElement).toBeInTheDocument();
    });

    test('truncates long titles', () => {
        const longTitle = 'This is a very long product title that should be truncated';
        const productWithLongTitle = { ...product, title: longTitle };
        render(<ProductCard product={productWithLongTitle} />);
        const truncatedTitle = screen.getByText('This is a very long product ti...');
        expect(truncatedTitle).toBeInTheDocument();
    });

    test('truncates titles longer than 30 characters', () => {
        const longTitle = 'This is a very long product title that should be truncated';
        const truncatedTitle = 'This is a very long product ti...';
        const productWithLongTitle = { ...product, title: longTitle };
        render(<ProductCard product={productWithLongTitle} />);
        const titleElement = screen.getByText(truncatedTitle);
        expect(titleElement).toBeInTheDocument();
        expect(titleElement.textContent).toHaveLength(30 + 3); // 30 characters + ellipsis
    });

    test('renders a link with the correct path and query', () => {
        render(
            <ProductCard product={product} />
        );

        const link = screen.getByRole('link');
        expect(link.getAttribute('href')).toBe('/product?id=1');
    });

    test('truncates the product title and adds underline on mouse over', () => {
        render(
            <ProductCard product={product} />
        );

        const typography = screen.getByText(product.title);
        expect(typography).toBeInTheDocument();

        fireEvent.mouseOver(typography);
        expect(typography).toHaveStyle('text-decoration: underline');

        fireEvent.mouseOut(typography);
        expect(typography).toHaveStyle('text-decoration: none');
    });
});

