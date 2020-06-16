import React, { Component } from 'react';
import ImageCarousel from './ImageCarousel';
import '../decoration/CategoryList.css';

const CategoryItem = (props) => {
    return (
        <a className="category-item" href="#">
            <div className="category-item__image">
                <div className="category-item__background"></div>
                <picture>
                    <img
                        className="image"
                        src={`${process.env.PUBLIC_URL}/category/${props.image}.svg`} 
                        alt="category-image"
                    />
                </picture>
            </div>                
            <h1 className="category-item__header">
                {props.name}
            </h1>
        </a>
    );
}


class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: [
                {
                    name: '洋裝',
                    image: 'dress',
                    catid: 100,
                },
                {
                    name: '女上衣',
                    image: 'woman-t-shirts',
                    catid: 100,
                },
                {
                    name: '裙子',
                    image: 'woman-skirts',
                    catid: 100,
                },
                {
                    name: '女鞋',
                    image: 'woman-shoes',
                    catid: 100,
                },
                {
                    name: '牛仔褲',
                    image: 'clothes',
                    catid: 100,
                },
                {
                    name: '男T恤',
                    image: 'man-tshirts',
                    catid: 100,
                },
                {
                    name: '男短褲',
                    image: 'man-shorts',
                    catid: 100,
                },
                {
                    name: '男外套',
                    image: 'jackets',
                    catid: 100,
                },
                {
                    name: '男眼鏡',
                    image: 'glasses',
                    catid: 100,
                },
                {
                    name: '男長褲',
                    image: 'man-pants',
                    catid: 100,
                },
                {
                    name: '帽子',
                    image: 'hat',
                    catid: 100,
                },
                {
                    name: '洋裝',
                    image: 'dress',
                    catid: 100,
                },
                {
                    name: '女上衣',
                    image: 'woman-t-shirts',
                    catid: 100,
                },
                {
                    name: '裙子',
                    image: 'woman-skirts',
                    catid: 100,
                },
                {
                    name: '女鞋',
                    image: 'woman-shoes',
                    catid: 100,
                },
                {
                    name: '牛仔褲',
                    image: 'clothes',
                    catid: 100,
                },
                {
                    name: '男T恤',
                    image: 'man-tshirts',
                    catid: 100,
                },
                {
                    name: '男短褲',
                    image: 'man-shorts',
                    catid: 100,
                },
                {
                    name: '男外套',
                    image: 'jackets',
                    catid: 100,
                },
                {
                    name: '男眼鏡',
                    image: 'glasses',
                    catid: 100,
                },
                {
                    name: '男長褲',
                    image: 'man-pants',
                    catid: 100,
                },
                {
                    name: '帽子',
                    image: 'hat',
                    catid: 100,
                },
            ]
        };
    }
    render() {
        const {items} = this.state;
        let list = items.map(function(item, index) {
            return (
                <CategoryItem key={index} {...item}/>
            );
        });

        return (
            <section className="homepage-section category-list" id="category-section">
                <div className="l-wrapper">
                    <div className="homepage-section__header" id="category-list__header">
                        <h1>商品分類</h1>
                    </div>
                    <div className="homepage-section__content">
                        <ImageCarousel
                            default_setting = {
                                {
                                    slideToShow: 10,
                                    slideToScroll: 10,
                                }
                            }
                            responsive = {
                                [
                                    {
                                        breakpoint: 1200,
                                        setting: {
                                            slideToShow: 8,
                                            slideToScroll: 8,
                                        }
                                    },
                                    {
                                        breakpoint: 900,
                                        setting: {
                                            slideToShow: 5,
                                            slideToScroll: 5,
                                            scrollable: true,
                                        }
                                    },
                                    {
                                        breakpoint: 600,
                                        setting: {
                                            slideToShow: 3,
                                            slideToScroll: 3,
                                            scrollable: true,
                                        }
                                    }
                                ]
                            }
                        >
                            {list}
                        </ImageCarousel>
                    </div>
                </div>
            </section>            
        );
    }
}

export default CategoryList;