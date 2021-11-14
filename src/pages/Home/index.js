import React, { useState, useEffect } from "react";
import {
    Typography
} from '@material-ui/core';
import Layout from "../../components/Layout";
import BookCover from "../../components/BookCover";
import RoomCover from "../../components/RoomCover";
import Categories from "../../components/Categories";
import clsx from "clsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useStyles } from "./styles";

const Home = () => {
    const classes = useStyles();
    const [ad, setAd] = useState('');

    const categories = [
        {id: 1, title: "History", img: "./img/history_bg.jfif"},
        {id: 2, title: "Sci-Fi", img: "./img/scifi_bg.jfif"},
        {id: 3, title: "Fiction", img: "./img/fiction_bg.jfif"},
        {id: 4, title: "Science", img: "./img/science_bg.png"},
    ];
    const rooms = [
        {id: 1, title: "1st Session", category: "The Hobbit", attendees: "10", cover: "./img/book_1.jfif"},
        {id: 2, title: "Follow up", category: "Game of Thrones", attendees: "15", cover: "./img/got_cover.jfif"},
        {id: 3, title: "Follow up", category: "From Zero to One", attendees: "7", cover: "./img/zero_one_cover.jfif"},
        {id: 4, title: "Follow up", category: "Ce que le jour doit à la nuit", attendees: "5", cover: "./img/book_5.jfif"},
    ];
    const books = [
        {id: 1, title: "The Hobbit", author: "JRR. Tolklien", cover: "./img/book_1.jfif"},
        {id: 2, title: "Futurama", author: "Michael Douglas JR.", cover: "./img/book_2.jfif"},
        {id: 3, title: "Relatively Famous", author: "Jessica Park", cover: "./img/book_3.jfif"},
        {id: 4, title: "Heal Your Mind Rewire Your Brain", author: "Patt-Lind Kyle", cover: "./img/book_4.jfif"},
        {id: 5, title: "It's about damn time", author: "Arlan Hamilton", cover: "https://assets-global.website-files.com/5f568f3b0b09b038fab5f5e2/616e3780a9f5ae3126ec6049_original.jpg"},
    ];

    const shuffle = (array) =>{
        let curId = array.length;
        while (0 !== curId) {
          let randId = Math.floor(Math.random() * curId);
          curId -= 1;
          let tmp = array[curId];
          array[curId] = array[randId];
          array[randId] = tmp;
        }
        return array;
    }

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
            <div>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={2}
                >
                    {shuffle(rooms).map((room) => (
                        <SwiperSlide key={room.id}>
                            <RoomCover 
                                title={room.title} 
                                category={room.category} 
                                numPeople={+room.attendees}
                                cover={room.cover}
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
                   {shuffle(books).map((book) => (
                        <SwiperSlide key={book.id}>
                            <BookCover 
                                cover={book.cover}  
                                title={book.title} 
                                subtitle={book.author} 
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
                   {shuffle(books).map((book) => (
                        <SwiperSlide key={book.id}>
                            <BookCover 
                                cover={book.cover}  
                                title={book.title} 
                                subtitle={book.author} 
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