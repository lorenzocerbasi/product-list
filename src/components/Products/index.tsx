import Image from "next/image";
import ListProducts from './products.json'
import { formatPrice } from "@/utils/format";
import { HeartStraight } from 'phosphor-react'

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

  return (
    <>
      {
        listProducts?.map((product: Products) =>
          <div
            key={product?.id}
            className="bg-white p-5 transition-all rounded-lg border border-transparent hover:border-gray-300 group"
          >
            <div className="relative transition-all opacity-0 group-hover:opacity-100 z-10">
              <button className="absolute right-0 bg-white text-black border border-gray-300 rounded-full p-2
              transition-all hover:text-red-500"
              >
                <HeartStraight size={22} />
              </button>
            </div>
            <div className="w-full h-[300px]">
              <Image src={product?.image} alt={product?.name} width={250} height={300}
                className='hover:scale-105 transition-all duration-500 cursor-pointer'
              />
            </div>
            <p className="text-gray-400 uppercase text-sm mt-5 cursor-pointer transition-all hover:text-gray-600">
              {product?.brand}
            </p>
            <p className="cursor-pointer transition-all hover:text-blue-600">
              {product?.name}
            </p>
            <div className="flex items-center gap-2 my-0.5">
              {!product?.discount_price
                ? <p className="font-medium text-lg">
                  {formatPrice(product?.price)}
                </p>
                : <>
                  <p className="line-through text-gray-400">
                    {formatPrice(product?.price)}
                  </p>
                  <p className="text-red-500 font-medium text-lg">
                    {formatPrice(product?.discount_price)}
                  </p>
                </>
              }
            </div>
            <p className="text-xs">
              em até <b>12x de&nbsp;
                {!product?.discount_price
                  ? formatPrice(product?.price / 12)
                  : formatPrice(product?.discount_price / 12)
                }</b> sem juros
            </p>
            <button className="bg-green-500 w-full py-1.5 rounded-md mt-4 text-white font-medium transition-all hover:bg-green-600">
              Adicionar
            </button>
          </div>
        )
      }
    </>
  )
}