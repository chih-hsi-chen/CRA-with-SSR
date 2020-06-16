import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageCarousel from './ImageCarousel';
import '../decoration/HeroBanner.css';

const BannerItem = (props) => {
    return (
        <div className="carousel__item">
            <img 
                src={`${process.env.PUBLIC_URL}/hero-banner/${props.image}.jpg`} 
                alt="banner"
                style = {
                    {
                        display: 'block',
                        width: '100%',
                    }
                }
            />
        </div>
    );
};

class HeroBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const {data} = this.props;
        const banners = data.map((item, index) => {
            return (
                <BannerItem
                    key = {index}
                    {...item}
                >
                </BannerItem>
            );
        });

        return (
            <React.Fragment>
                <section className="hero-banner">
                    <div className="carousel__container">
                        <ImageCarousel
                            default_setting = {
                                {
                                    slideToShow: 1,
                                    slideToScroll: 1,
                                    draggable: true,
                                    infinite: true,
                                    auto: true,
                                    dots: true,
                                    dragSpeed: 1.2,
                                }
                            }
                        >
                            {banners}
                        </ImageCarousel>
                    </div>                  
                </section>
            </React.Fragment>
        );
    }
}

HeroBanner.propTypes = {
    data: PropTypes.array.isRequired,
};
HeroBanner.defaultProps = {
    data: [
        {
            image: '1585153114_EimnJ6'
        }
    ]
};

export default HeroBanner;