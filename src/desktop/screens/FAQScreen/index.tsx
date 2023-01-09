import React, { FC, ReactElement } from 'react';
import { useDocumentTitle } from 'src/hooks';
import { Logo } from '../../../assets/images/Logo';
import { useSelector } from 'react-redux';
import { selectBlogs } from 'src/modules';

export const FAQScreen: FC = (): ReactElement => {
    useDocumentTitle('FAQ');

    const blog = useSelector(selectBlogs);
    console.log(blog, 'ini blog');

    const faq = [
        {
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
        {
            title: 'Bitcoin Price Crosses $20K as US Dollar Strength Falls',
            date: '22-02-2022',
            readTime: '2 min read',
        },
    ];
    return (
        <React.Fragment>
            <div className="content-wrapper no-sidebar faq-screen dark-bg-accent pb-5">
                <div
                    className="overflow-auto py-lg-5 background"
                    style={{ backgroundImage: `url('img/background-landing.png')` }}>
                    <div className="d-flex justify-content-center align-items-center">
                        <h3 className="title-1 white-text py-5 font-bold">Heaven Exchange FAQ</h3>
                    </div>
                </div>
                <div className="container">
                    <div className="articles">
                        <div className="row justify-content-center">
                            <div className="col-xl-11">
                                <div className="row">
                                    {faq &&
                                        faq.map((item, key) => (
                                            <div key={key} className="col-md-4 col-sm-6 col-12 mb-4">
                                                <div className="article-item p-4 radius-md dark-bg-main">
                                                    <Logo className="mb-24" />
                                                    <p className="grey-text-accent text-md mb-12">FAQ </p>
                                                    <h6 className="title mb-24">
                                                        <a
                                                            href="/detail-article/"
                                                            className="white-text font-normal text-md">
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
