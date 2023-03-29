import Head from "next/head";
import { Products } from "@/components/Products";

const Home = () => {
  return (
    <>
      <Head>
        <title>Celulares | E-commerce</title>
      </Head>
      <div className="px-4 sm:px-20 md:px-16 lg:px-28 py-10 bg-gray-100">
        <h1 className="mb-10 text-3xl font-semibold flex justify-center md:justify-start">
          Celulares
        </h1>
        <div className="flex justify-center md:justify-between gap-x-4 gap-y-6 flex-wrap">
          <Products />
        </div>
      </div>
    </>
  )
}

export default Home