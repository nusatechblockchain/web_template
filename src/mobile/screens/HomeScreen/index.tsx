import * as React from 'react';
import Background1 from '../../assets/Images/home/background-1.png';
import Background2 from '../../assets/Images/home/background-2.png';
import Background3 from '../../assets/Images/home/background-3.png';
import Background4 from '../../assets/Images/home/background-4.png';
import { ArrowRight } from '../../assets/Arrow';
import ImgCard from '../../assets/Images/home/img-card.png';
import { BgCardSmall } from '../../assets/BackgroundCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomeMobileScreen: React.FC = () => {
    const banner = [
        { background: Background1 },
        { background: Background2 },
        { background: Background3 },
        { background: Background4 },
    ];

    const bannerSmall = [
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
    ];

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: true,
    };

    const settings2 = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    return (
        <React.Fragment>
            <div className="mobile-container home-screen dark-bg-main">
                <div id="heros" className="content-container w-100 mb-3">
                    <Slider {...settings}>
                        {banner &&
                            banner.map((item, key) => (
                                <div className="heroid" key={key}>
                                    <div
                                        className="hero one w-100 d-flex align-items-center justify-content-start position-relative"
                                        style={{
                                            backgroundImage: `url(${item.background})`,
                                        }}></div>
                                </div>
                            ))}
                    </Slider>
                </div>
                <div className="beginner-wrapper mb-3">
                    <h5 className="text-ms font-bold grey-text-accent">For Beginners</h5>
                    <h6 className="mb-3 text-xs grey-text font-normal">
                        Most popular and widely known coin for early investment
                    </h6>
                    <Slider {...settings2}>
                        {bannerSmall &&
                            bannerSmall.map((item, key) => (
                                <div key={key} className="p-2">
                                    <div className="card-item position-relative">
                                        <BgCardSmall className={'bg-card'} />
                                        <div className="w-100 d-flex justify-content-center align-items-center mb-8">
                                            <img src={ImgCard} alt="card" className="text-center" />
                                        </div>
                                        <div className=" d-flex justify-content-between align-items-center">
                                            <div>
                                                <p className="text-xxs grey-text mb-0">{item.date}</p>
                                                <h4 className="text-xs white-text font-bold mb-0">{item.title}</h4>
                                                <p className="text-xxs grey-text mb-0">{item.desc}</p>
                                            </div>
                                            <ArrowRight className={''} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>
        </React.Fragment>
    );
};

export { HomeMobileScreen };
