import Head from "next/head";
import { Products } from "@/components/Products";
import ListProducts from '../components/Products/products.json'
import { MagnifyingGlass } from "phosphor-react";
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
  const [search, setSearch] = useState<string>('')
  const [activeFavoriteList, setActiveFavoriteList] = useState<boolean>(false)

  return (
    <>
      <Head>
        <title>Celulares | E-commerce</title>
      </Head>
      {/* <div className="px-4 sm:px-20 md:px-16 lg:px-28 py-10 bg-gray-100"> */}
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
                ? 'X Lista de favoritos'
                : 'Lista de favoritos'
              }
            </button>
            <p>Lista dos adicionados</p>
            <h3 className="text-xl font-semibold">Ordenar</h3>
            <p>Ordenar por preço crescente</p>
            <p>Ordenar por preço descrescente</p>
          </div>
          <div className="flex justify-center md:justify-between gap-x-4 gap-y-6 flex-wrap w-full">
            <Products
              listProducts={listProducts}
              search={search}
              activeFavoriteList={activeFavoriteList}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home