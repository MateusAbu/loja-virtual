import { render, screen, fireEvent } from '@testing-library/react';
import { CartContext } from '../../hooks/useCart';
import CartCard from './CartCard';

describe('CartCard', () => {
    const cart = [
        {
            userId: 1,
            date: '2023-06-17',
            products: [
                {
                    productId: 1,
                    quantity: 2,
                },
            ],
        },
    ];

    const cartDetails = [
        {
            id: 1,
            title: 'Product 1',
            price: 10,
            description: 'Product 1',
            category: 'Product Category',
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            rating: {
                count: 5,
                rate: 4.5,
            },
        },
    ];

    const updateCartItem = jest.fn();
    const handleDelete = jest.fn();
    const addToCart = jest.fn(); // Adicione a propriedade `addToCart` aqui

    const cartContextValue = {
        cart,
        cartDetails,
        updateCartItem,
        handleDelete,
        addToCart, // Adicione a propriedade `addToCart` ao objeto do contexto
    };

    test('renders cart items and calculates total price', () => {
        render(
            <CartContext.Provider value={cartContextValue}>
                <CartCard />
            </CartContext.Provider>
        );

        const cartItem = screen.getByTestId('cart-item');
        expect(cartItem).toBeInTheDocument();

        const image = screen.getByAltText('Product 1');
        expect(image).toBeInTheDocument();
        expect(image.getAttribute('src')).toBe('/_next/image?url=https%3A%2F%2Ffakestoreapi.com%2Fimg%2F81fPKd-2AYL._AC_SL1500_.jpg&w=640&q=75');

        const title = screen.getByText('Product 1');
        expect(title).toBeInTheDocument();

        const price = screen.getByText('Price: $10');
        expect(price).toBeInTheDocument();

        const quantityInput = screen.getByTestId('quantity-input') as HTMLInputElement;
        expect(quantityInput).toBeInTheDocument();
        expect(quantityInput.value).toBe('2');


        fireEvent.change(quantityInput, { target: { value: '3' } });
        expect(updateCartItem).toHaveBeenCalledTimes(1);
        expect(updateCartItem).toHaveBeenCalledWith(
            {
                userId: 1,
                date: '2023-06-17',
                products: [{ productId: 1, quantity: 3 }],
            },
        );

        const deleteButton = screen.getByTestId('trash-icon') as HTMLInputElement;
        expect(deleteButton).toBeInTheDocument();
        fireEvent.click(deleteButton);
        expect(handleDelete).toHaveBeenCalledTimes(1);
        expect(handleDelete).toHaveBeenCalledWith(1, 1);

        const totalPrice = screen.getByText('Total Price: $20.00');
        expect(totalPrice).toBeInTheDocument();
    });

    test('renders empty cart message when cart is empty', () => {
        const emptyCart = [
            {
                userId: 1,
                date: '2023-06-17',
                products: [],
            },
        ];

        render(
            <CartContext.Provider value={{ ...cartContextValue, cart: emptyCart }}>
                <CartCard />
            </CartContext.Provider>
        );

        const emptyCartMessage = screen.getByText('Empty Cart');
        expect(emptyCartMessage).toBeInTheDocument();
    });

});
