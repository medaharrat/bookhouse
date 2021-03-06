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
import { 
    getRooms, useRoomDispatch, useRoomState,
    getBooks, useBookDispatch, useBookState
} from "../../context";

const Home = () => {
    const classes = useStyles();
    const [ad, setAd] = useState('');
    const { rooms } = useRoomState();
    const { books } = useBookState();
    
    const roomDispatch = useRoomDispatch();
    const bookDispatch = useBookDispatch();

    const categories = [
        {id: 1, title: "History", img: "./img/history_bg.jfif"},
        {id: 2, title: "Sci-Fi", img: "./img/scifi_bg.jfif"},
        {id: 3, title: "Fiction", img: "./img/fiction_bg.jfif"},
        {id: 4, title: "Science", img: "./img/science_bg.png"},
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

        // Run queries
        getRooms(roomDispatch);
        getBooks(bookDispatch);

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
                    {rooms && shuffle(rooms).map((room) => (
                        <SwiperSlide key={room._id}>
                            <RoomCover 
                                id={room._id}
                                title={room.title} 
                                book={room.book.title} 
                                numPeople={+room.attendees}
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
                   {books && shuffle(books).map((book) => (
                        <SwiperSlide key={book._id}>
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
                   {books && shuffle(books).map((book) => (
                        <SwiperSlide key={book._id}>
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