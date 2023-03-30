import Head from "next/head";
import { Products } from "@/components/Products";
import ListProducts from '@/components/Products/products.json'
import { MagnifyingGlass, X } from "phosphor-react";
import { ChangeEvent, useState } from "react";

interface Products {
  id: number;
  image: string;
  brand: string;
  name: string;
  price: number;
  discount_price?: number;
}

const Home = () => {
  const listProducts: Products[] = ListProducts;
  const [activeFavoriteList, setActiveFavoriteList] = useState<boolean>(false)
  const [activeAddCartList, setActiveAddCartList] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  return (
    <>
      <Head>
        <title>Celulares | E-commerce</title>
      </Head>
      <div className="px-4 sm:px-14 md:px-16 lg:px-8 py-10 bg-gray-100">
        <h1 className="mb-10 text-3xl font-semibold flex justify-center md:justify-start">
          Celulares
        </h1>
        <div className="flex flex-col md:flex-row gap-8 ">
          <div className="flex flex-col bg-white rounded-lg px-10 py-4 w-full md:w-2/6 h-max gap-2 shadow-md">
            <div className="relative mb-2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlass />
              </div>
              <input
                placeholder="Pesquisar pelo nome do produto"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                  focus:border-blue-500 block w-full pl-10 p-2.5"
                value={search}
                onChange={(ev: ChangeEvent<HTMLInputElement>) => setSearch(ev?.target?.value)}
              />
            </div>
            <h3 className="text-xl font-semibold">Listas</h3>
            <button className="w-max" onClick={() => setActiveFavoriteList(!activeFavoriteList)}>
              {activeFavoriteList
                ? <p className="flex items-center gap-2 font-medium">
                  <X size={18} className="mt-0.5" />
                  Lista de favoritos
                </p>
                : 'Lista de favoritos'
              }
            </button>
            <button className="w-max" onClick={() => setActiveAddCartList(!activeAddCartList)}>
              {activeAddCartList
                ? <p className="flex items-center gap-2 font-medium">
                  <X size={18} className="mt-0.5" />
                  Lista dos adicionados
                </p>
                : 'Lista dos adicionados'
              }
            </button>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-x-2 gap-y-6">
            <Products
              listProducts={listProducts}
              search={search}
              activeFavoriteList={activeFavoriteList}
              activeAddCartList={activeAddCartList}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home