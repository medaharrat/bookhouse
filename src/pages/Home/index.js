import React, { useState, useEffect } from "react";
import {
    Typography
} from '@material-ui/core';
import Layout from "../../components/Layout";
import BookCover from "../../components/BookCover";
import Categories from "../../components/Categories";
import clsx from "clsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useStyles } from "./styles";

const Home = () => {
    const classes = useStyles();
    const [ad, setAd] = useState('');

    const categories = [
        {title: "History", bg: "/img/history_bg.jfif"},
        {title: "Sci-Fi", bg: "./img/scifi_bg.jfif"},
        {title: "Fiction", bg: "./img/fiction_bg.jfif"},
        {title: "Science", bg: "./img/science_bg.png"},
    ];

    useEffect(() => {
        const advertisement = "Check out this month's Belletrist book pick The Days of Afrekete by Asali Solomon.";
       
        if(advertisement !== ad)
            setAd(advertisement);
        // eslint-disable-next-line
    }, [ad]);

    return (
        <Layout ad={ad}>
            {/* Categories */}
            <Categories categories={categories}/>
            {/* Suggested rooms */}
            <div className={classes.divider} />
            <Typography className={classes.subtitle}>
                Suggested rooms
            </Typography>
            <div className={classes.swiper}>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={3}
                >
                   {[{id: 1, title: "A Beatiful Mind", subtitle: "John Nash", cover: "https://assets-global.website-files.com/5f568f3b0b09b038fab5f5e2/616e3780a9f5ae3126ec6049_original.jpg"},
                    {id: 2, title: "A Beatiful Mind", subtitle: "John Nash", cover: "https://assets-global.website-files.com/5f568f3b0b09b038fab5f5e2/616e3780a9f5ae3126ec6049_original.jpg"},
                    {id: 3, title: "A Beatiful Mind", subtitle: "John Nash", cover: "https://assets-global.website-files.com/5f568f3b0b09b038fab5f5e2/616e3780a9f5ae3126ec6049_original.jpg"}]
                    .map((book) => (
                        <SwiperSlide key={book.id}>
                            <BookCover 
                                cover={book.cover}  
                                title={book.title} 
                                subtitle={book.subtitle} 
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Featured Books */}
            <div className={classes.divider} />
            <Typography className={classes.subtitle}>
                Featured books
            </Typography>
            <div className={classes.swiper}>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={3}
                >
                   {[{id: 1, title: "A Beatiful Mind", subtitle: "John Nash", cover: "https://assets-global.website-files.com/5f568f3b0b09b038fab5f5e2/616e3780a9f5ae3126ec6049_original.jpg"},
                    {id: 2, title: "A Beatiful Mind", subtitle: "John Nash", cover: "https://assets-global.website-files.com/5f568f3b0b09b038fab5f5e2/616e3780a9f5ae3126ec6049_original.jpg"},
                    {id: 3, title: "A Beatiful Mind", subtitle: "John Nash", cover: "https://assets-global.website-files.com/5f568f3b0b09b038fab5f5e2/616e3780a9f5ae3126ec6049_original.jpg"}]
                    .map((book) => (
                        <SwiperSlide key={book.id}>
                            <BookCover 
                                cover={book.cover}  
                                title={book.title} 
                                subtitle={book.subtitle} 
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Based on your recent interests */}
            <div className={classes.divider} />
            <Typography className={classes.subtitle}>
                Based on your recent interests
            </Typography>
            <div>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={3}
                >
                   {[{id: 1, title: "A Beatiful Mind", subtitle: "John Nash", cover: "https://assets-global.website-files.com/5f568f3b0b09b038fab5f5e2/616e3780a9f5ae3126ec6049_original.jpg"},
                    {id: 2, title: "A Beatiful Mind", subtitle: "John Nash", cover: "https://assets-global.website-files.com/5f568f3b0b09b038fab5f5e2/616e3780a9f5ae3126ec6049_original.jpg"},
                    {id: 3, title: "A Beatiful Mind", subtitle: "John Nash", cover: "https://assets-global.website-files.com/5f568f3b0b09b038fab5f5e2/616e3780a9f5ae3126ec6049_original.jpg"}]
                    .map((book) => (
                        <SwiperSlide key={book.id}>
                            <BookCover 
                                cover={book.cover}  
                                title={book.title} 
                                subtitle={book.subtitle} 
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* */}
            <div className={clsx(classes.divider, classes.p2)} />

        </Layout>
    );
}

export default Home;