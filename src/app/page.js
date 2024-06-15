import React from 'react';
import HeroSection from './heroSection/page';
import ShortIntro from './shortIntro/page';
import FreeServices from './freeServices/page';
import Subscribe from './subscribe/page';
import MostRated from './mostRated/page';
import Dashboard from './dashboard/page';

export default function Home() {
    return (
        <>
            <div className="pt-[83px]">
                <HeroSection />
                <MostRated />
                <ShortIntro />
                <FreeServices />
                <Subscribe />
            </div>
        </>
    );
}
