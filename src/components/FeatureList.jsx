import React, { Component } from 'react';
import '../decoration/FeatureList.css';

const Feature = (props) => {
    return (
        <section className="values__block">
            <div className="values__image">
                <img src={`${process.env.PUBLIC_URL}/values/${props.image}.svg`} alt="values block" />
            </div>
            <h1 className="values__title">{props.title}</h1>
            <p className="values__details">
                {props.details}
            </p>
        </section>
    );
};

class FeatureList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: [
                {
                    title: '網羅各國好設計',
                    details: '你無須走出家門，透過網路即可找到最適合你的商品！',
                    image: 'full-collection',
                },
                {
                    title: '優惠特價好所在',
                    details: '貨比三家不吃虧，以更優惠的價格買到你心目中的設計。',
                    image: 'discount',
                },
                {
                    title: '消費資訊不外洩',
                    details: '由專業團隊為你的個資做層層把關，保障你的消費權益！',
                    image: 'security',
                },
            ]
        };
    }
    render() {
        const {blocks} = this.state;
        const features = blocks.map((feature, index) => {
            return (
                <Feature key={index} {...feature} >

                </Feature>
            );
        });

        return (
            <section className="core-values">
                <div className="l-wrapper">
                    <div className="values__container">
                        {features}
                    </div>
                </div>                
            </section>
        );
    }
}
 
export default FeatureList;