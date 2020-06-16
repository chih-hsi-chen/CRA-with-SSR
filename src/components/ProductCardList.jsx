import React, { Component } from 'react';
import ImageCarousel from './ImageCarousel';
import PropTypes from 'prop-types';
import ProductImage from '../images/products/test.jpg';
import '../decoration/ProductCardList.css';

const ProductCard = (props) => {
    return (
        <article className = "card-product">
            <div className="card-product__link">
                <div className="product-link__top">
                    <a href="#" className="link-top__image">
                        <img src={ProductImage} />
                    </a>
                </div>
                <a 
                    href="#"
                    target="_blank" 
                    className="product-link__bottom"
                    title = {props.name}
                >
                    <p className="title">
                        {props.name}
                    </p>
                </a>
            </div>
            <div className="card-product__details">
                <a href="#" target="_blank" className="brand">
                    {props.brand}
                </a>
                <div className="price-display">
                    <span className="price">
                        NT$ {Math.ceil(props.price / 100000)}
                    </span>
                </div>
            </div>
        </article>
    );
};

class ProductCardList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        };

    }
    render() {
        const {sec_name, data} = this.props;
        const cards = data.map(function(item, index) {
            return (
                <ProductCard key={index} {...item} />
            );
        });

        return ( 
            <section className="card-section" data-section>
                <div className="l-wrapper">
                    <div className="card-section__title homepage-section__header">
                        <h1 className="title">
                            <span className="title__text">{sec_name}</span>
                            <a href="#" className="title__more-link">看更多</a>
                        </h1>
                    </div>
                    <div className="card-section__content">
                        <ImageCarousel
                            default_setting = {
                                {
                                    slideToShow: 6,
                                    slideToScroll: 6,
                                }
                            }
                            responsive = {
                                [
                                    {
                                        breakpoint: 900,
                                        setting: {
                                            slideToShow: 4.2,
                                            slideToScroll: 4.2,
                                            scrollable: true,
                                        }
                                    },
                                    {
                                        breakpoint: 768,
                                        setting: {
                                            slideToShow: 3.2,
                                            slideToScroll: 3.2,
                                            scrollable: true,
                                        }
                                    },
                                    {
                                        breakpoint: 480,
                                        setting: {
                                            slideToShow: 2.2,
                                            slideToScroll: 2.2,
                                            scrollable: true,
                                        }
                                    }
                                ]
                            }
                        >
                            {cards}
                        </ImageCarousel>
                    </div>                    
                </div>                
            </section>
        );
    }
}

ProductCardList.propTypes = {
    sec_name: PropTypes.string,
    ref_link: PropTypes.string,
    data: PropTypes.array,
};
ProductCardList.defaultProps = {
    sec_name: '限時特賣',
    ref_link: '/browse?ref_sec=404',
    data: [
        {
            catid: 100,
            itemid: 2642754841,
            image: '77ebe79252d2e8ba49eaafdb04f07230',
            price_min: 75000000,
            price_max: 90000000,
            price: 90000000,
            brand: '自有品牌',
            shop_location: '台灣新竹市東區',
            name: '好穿透氣鞋好穿透氣鞋好穿透氣鞋好穿透氣鞋好穿透氣鞋好穿透氣鞋好穿透氣鞋好穿透氣鞋好穿透氣鞋好穿透氣鞋'
        },
        {
            catid: 100,
            itemid: 2642754841,
            image: '77ebe79252d2e8ba49eaafdb04f07230',
            price_min: 75000000,
            price_max: 90000000,
            price: 90000000,
            brand: '自有品牌',
            shop_location: '台灣新竹市東區',
            name: '好穿透氣鞋'
        },
        {
            catid: 100,
            itemid: 2642754841,
            image: '77ebe79252d2e8ba49eaafdb04f07230',
            price_min: 75000000,
            price_max: 90000000,
            price: 90000000,
            brand: '自有品牌',
            shop_location: '台灣新竹市東區',
            name: '好穿透氣鞋'
        },
        {
            catid: 100,
            itemid: 2642754841,
            image: '77ebe79252d2e8ba49eaafdb04f07230',
            price_min: 75000000,
            price_max: 90000000,
            price: 90000000,
            brand: '自有品牌',
            shop_location: '台灣新竹市東區',
            name: '好穿透氣鞋'
        },
        {
            catid: 100,
            itemid: 2642754841,
            image: '77ebe79252d2e8ba49eaafdb04f07230',
            price_min: 75000000,
            price_max: 90000000,
            price: 90000000,
            brand: '自有品牌',
            shop_location: '台灣新竹市東區',
            name: '好穿透氣鞋'
        },
        {
            catid: 100,
            itemid: 2642754841,
            image: '77ebe79252d2e8ba49eaafdb04f07230',
            price_min: 75000000,
            price_max: 90000000,
            price: 90000000,
            brand: '自有品牌',
            shop_location: '台灣新竹市東區',
            name: '好穿透氣鞋'
        },
        {
            catid: 100,
            itemid: 2642754841,
            image: '77ebe79252d2e8ba49eaafdb04f07230',
            price_min: 75000000,
            price_max: 90000000,
            price: 90000000,
            brand: '自有品牌',
            shop_location: '台灣新竹市東區',
            name: '好穿透氣鞋'
        },
        {
            catid: 100,
            itemid: 2642754841,
            image: '77ebe79252d2e8ba49eaafdb04f07230',
            price_min: 75000000,
            price_max: 90000000,
            price: 90000000,
            brand: '自有品牌',
            shop_location: '台灣新竹市東區',
            name: '好穿透氣鞋'
        },
        {
            catid: 100,
            itemid: 2642754841,
            image: '77ebe79252d2e8ba49eaafdb04f07230',
            price_min: 75000000,
            price_max: 90000000,
            price: 90000000,
            brand: '自有品牌',
            shop_location: '台灣新竹市東區',
            name: '好穿透氣鞋'
        },
        {
            catid: 100,
            itemid: 2642754841,
            image: '77ebe79252d2e8ba49eaafdb04f07230',
            price_min: 75000000,
            price_max: 90000000,
            price: 90000000,
            brand: '自有品牌',
            shop_location: '台灣新竹市東區',
            name: '好穿透氣鞋'
        },
        {
            catid: 100,
            itemid: 2642754841,
            image: '77ebe79252d2e8ba49eaafdb04f07230',
            price_min: 75000000,
            price_max: 90000000,
            price: 90000000,
            brand: '自有品牌',
            shop_location: '台灣新竹市東區',
            name: '好穿透氣鞋'
        },
        {
            catid: 100,
            itemid: 2642754841,
            image: '77ebe79252d2e8ba49eaafdb04f07230',
            price_min: 75000000,
            price_max: 90000000,
            price: 90000000,
            brand: '自有品牌',
            shop_location: '台灣新竹市東區',
            name: '好穿透氣鞋'
        },
    ],
};

export default ProductCardList;