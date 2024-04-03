'use client'

import { CarCard, CustomFilter, SearchBar } from "@/app/components";
import { fuels, yearsOfProduction } from "@/app/constants";
import { CartProps } from "@/app/types";

interface MyCartProps {
    allCars: CartProps[];
}

function MyCart({ allCars }: MyCartProps) {

    const isCarsEmpty = allCars.length < 1; // !Array.isArray(allCars) || allCars.length < 1 || !allCars;

    return (
        <div className="mt-22 padding-x padding-y max-width" id="discover">
            <div className="home_text-container">
                <p className=" mt-12">Explore the cars you might like</p>
            </div>
            {/* <div className="home__filters">
                <SearchBar />
                <div className="home__filter-container">
                    <CustomFilter title="fuel" options={fuels} />
                    <CustomFilter title="year" options={yearsOfProduction} />
                </div>
            </div> */}
            {!isCarsEmpty ? (
                <section>
                    <div className="home__cars-wrapper">
                        {allCars?.map((car) => (
                            <CarCard key={car?.combination_mpg} car={car} />
                        ))}
                    </div>

                </section>
            ) : (
                <h2 className="home__error-container">
                    <h2 className="text-black text-xl font-bold">Oops, no results</h2>
                    {/* <p>{allCars?.message}</p> */}
                </h2>
            )}
        </div>
    );
}

export default MyCart;
