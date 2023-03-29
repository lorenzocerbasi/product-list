import Image from "next/image";
import ListProducts from './products.json'
import { formatPrice } from "@/utils/format";
import { Check, HeartStraight } from 'phosphor-react';
import { useState, useEffect } from 'react';

interface Products {
  id: number;
  image: string;
  brand: string;
  name: string;
  price: number;
  discount_price: number;
}

export const Products = () => {
  const listProducts: Products[] = ListProducts;
  const [favorites, setFavorites] = useState<number[]>([]);
  const [addedToCart, setAddedToCart] = useState<number[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    const savedAddedCart = localStorage.getItem("addedToCart");
    if (savedAddedCart) {
      setAddedToCart(JSON.parse(savedAddedCart));
    }
  }, []);

  const handleFavoriteClick = (productId: number) => {
    const index = favorites.indexOf(productId);
    if (index === -1) {
      const newFavorites = [...favorites, productId];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...favorites];
      newFavorites.splice(index, 1);
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  const handleAddCartClick = (productId: number) => {
    const index = addedToCart.indexOf(productId);
    if (index === -1) {
      const newAddCart = [...addedToCart, productId];
      setAddedToCart(newAddCart);
      localStorage.setItem("addedToCart", JSON.stringify(newAddCart));
    } else {
      const newAddCart = [...addedToCart];
      newAddCart.splice(index, 1);
      setAddedToCart(newAddCart);
      localStorage.setItem("addedToCart", JSON.stringify(newAddCart));
    }
  };

  return (
    <>
      {
        listProducts?.map((product: Products) =>
          <div
            key={product?.id}
            className="bg-white p-6 3xl:p-8 transition-all rounded-lg border border-transparent hover:border-gray-300 group"
          >
            <div className="relative transition-all z-10">
              <button
                onClick={() => handleFavoriteClick(product.id)}
                className={`absolute right-0 text-black border rounded-full p-2 transition-all
                  ${favorites.includes(product?.id)
                    ? 'bg-red-500 border-red-500 text-white hover:bg-red-600'
                    : 'bg-white border-gray-300 text-black hover:bg-gray-200'}`
                }
              >
                <HeartStraight size={22} />
              </button>
            </div>
            <div className="w-full h-[300px]">
              <Image src={product?.image} alt={product?.name} width={250} height={300}
                className='hover:scale-105 transition-all duration-300 cursor-pointer select-none'
              />
            </div>
            <div className="mt-4">
              <p className="text-gray-400 uppercase text-sm 3xl:text-lg mt-5 cursor-pointer transition-all hover:text-gray-600">
                {product?.brand}
              </p>
              <p className="cursor-pointer transition-all hover:text-blue-600 3xl:text-xl">
                {product?.name}
              </p>
              <div className="flex items-center gap-2 my-0.5">
                {!product?.discount_price
                  ? <p className="font-medium text-lg 3xl:text-2xl">
                    {formatPrice(product?.price)}
                  </p>
                  : <>
                    <p className="line-through text-gray-400 3xl:text-xl">
                      {formatPrice(product?.price)}
                    </p>
                    <p className="text-red-500 font-medium text-lg 3xl:text-2xl">
                      {formatPrice(product?.discount_price)}
                    </p>
                  </>
                }
              </div>
              <p className="text-xs 3xl:text-base">
                em até <b>12x de&nbsp;
                  {!product?.discount_price
                    ? formatPrice(product?.price / 12)
                    : formatPrice(product?.discount_price / 12)
                  }</b> sem juros
              </p>
              <button
                onClick={() => handleAddCartClick((product.id))}
                className={`w-full py-1.5 rounded-md mt-4 font-medium transition-all 3xl:text-xl 
                  ${addedToCart.includes(product?.id)
                    ? 'bg-green-300 text-black hover:bg-green-400'
                    : 'bg-green-500 text-white hover:bg-green-600'}`
                }
              >
                {addedToCart.includes(product?.id)
                  ? <p className="flex justify-center gap-1">
                    <Check size={24} />
                    Adicionado
                  </p>
                  : 'Adicionar'
                }
              </button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Products;