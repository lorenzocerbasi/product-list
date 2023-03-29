import Head from "next/head";
import { Products } from "@/components/Products";

const Home = () => {
  return (
    <>
      <Head>
        <title>Celulares | E-commerce</title>
      </Head>
      <div className="px-32 py-10 bg-gray-100">
        <h1 className="mb-10 text-3xl font-semibold">
          Celulares
        </h1>
        <div className="flex justify-between gap-5">
          <Products />
        </div>
      </div>
    </>
  )
}

export default Home