import Image from "next/image";
import Link from "next/link";

export type Country = {
  name: {
    common: string;
  };
  translations: {
    por: {
      common: string;
    };
  };
  flags: {
    svg: string;
    alt: string;
  };
  capital: string;
  population: number;
  region: string;
  subregion: string;
  languages?: { ron: string };
  borders?: string[];
  cca3: string;
};
export default function CountryCard({
  name,
  ptName,
  flag,
  flagAlt,
}: {
  name: string;
  ptName: string;
  flag: string;
  flagAlt: string;
}) {
  return (
    <Link key={name} href={`/pais/${name}`}>
      <article className="min-h-full border-2 rounded-xl bg-white justify-center hover:border-indigo-200 transition-all hover:shadow-xl">
        <div className="relative w-full h-40 rounded-lg p-2 overflow-hidden">
          <Image alt={flagAlt} src={flag} fill className="object-cover" />
        </div>
        <h1 className=" font-bold text-center mt-1">{ptName}</h1>
      </article>
    </Link>
  );
}
