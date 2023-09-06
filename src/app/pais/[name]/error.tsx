"use client";

import Image from "next/image";
import Link from "next/link";
export default function Error() {
  return (
    <>
      <section className="flex container">
        <h1 className="font-bold text-2xl mt-5">
          Ops. Ocorreu um erro ao exibir informações sobre esse país!
        </h1>
      </section>
      <div className="flex justify-start  w-full px-10 mt-10">
        <Link href={"/"} className="flex text-right">
          <Image src={"/Frame.svg"} alt="" width={20} height={10} />
          Voltar
        </Link>
      </div>
    </>
  );
}
