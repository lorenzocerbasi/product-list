import Image from "next/image";
import { formatPrice } from "@/utils/format";
import { Check, HeartStraight } from 'phosphor-react';
import { useState, useEffect } from 'react';

interface Products {
  id: number;
  image: string;
  name: string;
  brand: string;
  price: number;
  discount_price?: number;
}

interface ProductsProps {
  listProducts: Products[];
  search: string;
  activeFavoriteList: boolean;
  activeAddCartList: boolean;
}

export const Products = ({ listProducts, search, activeFavoriteList, activeAddCartList }: ProductsProps) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [addedToCart, setAddedToCart] = useState<number[]>([]);

  // Carrega as informações dos favoritos salvos no localStorage assim que o componente é montado.
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Carrega as informações dos itens adicionados no 'carrinho' salvos no localStorage assim que o componente é montado.
  useEffect(() => {
    const savedAddedCart = localStorage.getItem("addedToCart");
    if (savedAddedCart) {
      setAddedToCart(JSON.parse(savedAddedCart));
    }
  }, []);

  // Essa função adiciona ou remove um produto da lista de favoritos, atualizando tanto o estado do componente quanto as informações salvas no localStorage.
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

  // Essa função adiciona ou remove um produto do 'carrinho', atualizando tanto o estado do componente quanto as informações salvas no localStorage.
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

  // Essa função filtra produtos pelo nome, ignorando maiúsculas e minúsculas, com base em um termo de pesquisa.
  let filteredProducts = listProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Essa função filtra os produtos que fazem parte da lista de favoritos.
  if (activeFavoriteList) {
    filteredProducts = filteredProducts.filter((product) => favorites.includes(product.id));
  }

    // Essa função filtra os produtos que fazem parte do 'carrinho'.
  if (activeAddCartList) {
    filteredProducts = filteredProducts.filter((product) => addedToCart.includes(product.id));
  }

  return (
    <>
      {filteredProducts?.length === 0
        ? <p className="text-gray-800">
          Nenhum resultado encontado.
        </p>
        : filteredProducts?.map((product: Products) =>
          <div
            key={product?.id}
            className="bg-white p-6 2xl:py-6 2xl:px-8 3xl:py-8 3xl:px-10 transition-all rounded-lg border 
              border-transparent group shadow-md hover:border-gray-300"
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
            <div className="w-full flex justify-center">
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