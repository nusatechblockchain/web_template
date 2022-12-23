import React, { FC, ReactElement, Component } from 'react';
import { useDocumentTitle } from 'src/hooks';
import AnouncementIcon from '../../../../public/img/landing-announcement.png';
import { ArrowLeftIcon } from '../../../assets/images/ArrowLeftIcon';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Background from '../../../../public/img/background.png';
import AnnouncementSlider from '../../../../public/img/Background-announcement.png';
import Banner from '../../../../public/img/Banner-1.png';
import AnnouncementImage from '../../../../public/img/announcement-big.png';
import LandingCard from '../../../../public/img/landing-card.png';

export const AnnouncementScreen: FC = (): ReactElement => {
    useDocumentTitle('Announcement');
    const settings = {
        // className: 'slider variable-width',
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        // variableWidth: true,
    };

    const bannerAnnouncement = [
        {
            label: '21 Hours Ago',
            name: 'Banner Announcement',
            desc: 'deskripsi',
        },
        {
            label: '21 Hours Ago',
            name: 'Banner Announcement',
            desc: 'deskripsi',
        },
        {
            label: '21 Hours Ago',
            name: 'Banner Announcement',
            desc: 'deskripsi',
        },
        {
            label: '21 Hours Ago',
            name: 'Banner Announcement',
            desc: 'deskripsi',
        },
    ];

    const announcement = [
        {
            category: 'Heaven News',
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            category: 'Heaven News',
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            category: 'Heaven News',
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            category: 'Heaven News',
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            category: 'Heaven News',
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        ,
        {
            category: 'Heaven News',
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            category: 'Heaven News',
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            category: 'Heaven News',
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            category: 'Heaven News',
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            category: 'Heaven News',
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            category: 'Heaven News',
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            category: 'Heaven News',
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
    ];
    return (
        <React.Fragment>
            <div className="announcement-screen no-sidebar dark-bg-accent pb-5">
                <div className="py-5" style={{ backgroundImage: `url(${Background})` }}>
                    <Slider {...settings}>
                        {bannerAnnouncement &&
                            bannerAnnouncement.map((item, key) => (
                                <div className="px-3 radius-md" key={key}>
                                    <div className="slider-item p-3">
                                        <img src={LandingCard} alt="" className="w-100 h-100" />
                                    </div>
                                </div>
                            ))}
                    </Slider>
                </div>
                <div className="container">
                    <div className="articles">
                        <div className="row justify-content-center">
                            <div className="col-xl-11">
                                <div className="row">
                                    {announcement &&
                                        announcement.map((item, key) => (
                                            <div key={key} className="col-md-4 col-sm-6 col-12 mb-4">
                                                <div className="article-item">
                                                    <img src={AnnouncementImage} className="w-100" alt="" />
                                                    <p className="blue-text mb-12">{item.category}</p>
                                                    <h6 className="title mb-24">
                                                        <a href="/detail-article/" className="grey-text-accent">
                                                            {item.title}
                                                        </a>
                                                    </h6>
                                                    <div className="d-flex">
                                                        <span className="grey-text">{item.date}</span>
                                                        <span className="px-3 dots grey-text">.</span>
                                                        <span className="grey-text">{item.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
