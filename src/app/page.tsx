import CountryCard, { Country } from "@/app/components/CountryCard";

export async function getcountry(): Promise<Country[]> {
  const response = await fetch(`https://restcountries.com/v3.1/all
  `);
  return response.json();
}
export default async function PageHome() {
  const country = await getcountry();

  return (
    <>
      <section className="gap-5 grid  grid-cols-1  xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full p-5">
        {country.map((country) => (
          <CountryCard
            key={country.name.common}
            name={country.name.common}
            flag={country.flags.svg}
            flagAlt={country.flags.alt}
            ptName={country.translations.por.common}
          />
        ))}
      </section>
    </>
  );
}
