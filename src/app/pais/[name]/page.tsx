import CountryCard, { Country } from "@/app/components/CountryCard";
import Image from "next/image";
import Link from "next/link";
async function getCuntriesNames(name: string): Promise<Country> {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  const data = (await response.json())[0];
  return data;
}

// outra forma de realizar a chamada na API aproveitando o cache que o next oferece
// async function getCuntriesNames(name: string): Promise<Country> {
//   const response = await fetch(`https://restcountries.com/v3.1/all`);
//   const countries: Country[] = await response.json();
//   return countries.find((country: Country) => country.name.common === name)!;
// }
export async function getCountryBorderName(name: string) {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const countries: Country[] = await response.json();
  const country = countries.find(
    (country: Country) => country.name.common === name
  )!;

  return country?.borders?.map((border) => {
    const borderCountry = countries.find((country) => country.cca3 === border)!;
    return {
      name: borderCountry?.name.common,
      ptName: borderCountry?.translations.por.common,
      flag: borderCountry?.flags.svg,
      flagAlt: borderCountry?.flags.alt,
    };
  });
}

export default async function PaisPage({
  params: { name },
}: {
  params: { name: string };
}) {
  // const country = await getCuntriesNames(decodeURI(name));
  const country = await getCuntriesNames(decodeURI(name));
  const countryBorders = await getCountryBorderName(decodeURI(name));
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <>
      <section className="flex flex-col container">
        <h1 className=" text-4xl text-center font-bold mt-12">
          {country.translations.por.common}
        </h1>
        <Link href={"/"} className="flex">
          <Image src={"/Frame.svg"} alt="" width={20} height={10} />
          Voltar
        </Link>
        <article className="bg-white md:flex-row flex-col  min-w-full  p-5 mt-4 justify-between rounded-xl flex">
          <section className="flex flex-col w-full ml-2">
            {country.capital && (
              <h2 className="text-xl text-gray-800 mt-3">
                <b>Capital: </b>
                {country.capital}
              </h2>
            )}
            <h2 className="text-xl text-gray-800 mt-3">
              <b>Continente: </b>
              {country.region} {country.subregion && `- ${country.subregion}`}
            </h2>
            <h2 className="text-xl text-gray-800 mt-3">
              <b>População: </b>

              {formatter.format(country.population)}
            </h2>

            {country.languages && (
              <h2 className="text-xl text-gray-800 mt-3">
                <b>Linguas Faladas: </b>
                <br />
                {Object.values(country.languages).map((language) => (
                  <span
                    key={language}
                    className="bg-blue-500
                 rounded-xl inline-block px-2 mr-2 text-white text-center font-bold text-sm"
                  >
                    {language}
                  </span>
                ))}
              </h2>
            )}
          </section>
          <div className="relative h-48 shadow-xl w-96  md:h-auto my-2 md:order-last order-first">
            <Image
              alt={country.flags.alt}
              src={country.flags.svg}
              fill
              className="object-cover"
            />
          </div>
        </article>
      </section>

      <h2 className="font-bold mt-6 text-xl text-right flex">
        Países que fazem fronteira
      </h2>
      <div className="gap-5 grid  grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full p-5">
        {countryBorders?.map((border) => (
          <CountryCard key={border.name} {...border} />
        ))}
      </div>
    </>
  );
}
