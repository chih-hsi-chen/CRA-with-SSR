import React, { Component } from 'react';
import {
    Instagram,
    Twitter,
    Facebook,
    YouTube
} from '@material-ui/icons';
import logo from '../images/logo_large.png';
import '../decoration/Footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <footer className="ex-footer">
                <div className="l-wrapper">
                    <div className="footer__links">
                        <section className="f-link" name="purchase">
                            <h1 className="f-link__title">購買</h1>
                            <ul className="f-link__list">
                                <li className="f-link__item">
                                    <a href="#">全館商品分類</a>
                                </li>
                                <li className="f-link__item">
                                    <a href="#">本月新品</a>
                                </li>
                                <li className="f-link__item">
                                    <a href="#">熱銷排行榜</a>
                                </li>
                                <li className="f-link__item">
                                    <a href="#">季節限定</a>
                                </li>
                                <li className="f-link__item">
                                    <a href="#">限時特價</a>
                                </li>
                            </ul>
                        </section>
                        <section className="f-link" name="help">
                            <h1 className="f-link__title">幫助</h1>
                            <ul className="f-link__list">
                                <li className="f-link__item">
                                    <a href="#">最新公告</a>
                                </li>
                                <li className="f-link__item">
                                    <a href="#">常見問答</a>
                                </li>
                                <li className="f-link__item">
                                    <a href="#">退貨辦法</a>
                                </li>
                            </ul>
                        </section>
                        <section className="f-link" name="policy">
                            <h1 className="f-link__title">政策</h1>
                            <ul className="f-link__list">
                                <li className="f-link__item">
                                    <a href="#">隱私權政策</a>
                                </li>
                                <li className="f-link__item">
                                    <a href="#">會員條款</a>
                                </li>
                            </ul>
                        </section>
                        <section className="f-link" name="about">
                            <h1 className="f-link__title">關於 ExShop</h1>
                            <ul className="f-link__list">
                                <li className="f-link__item">
                                    <a href="#">關於我們</a>
                                </li>
                                <li className="f-link__item">
                                    <a href="#">聯絡我們</a>
                                </li>
                                <li className="f-link__item">
                                    <a href="#">加入 ExShop</a>
                                </li>
                            </ul>
                        </section>
                        <section className="f-link" name="follow">
                            <h1 className="f-link__title">追蹤 ExShop</h1>
                            <ul className="f-link__list">
                                <li className="f-link__item">
                                    <a href="#" className="follow-link">
                                        <Instagram className="follow-link__icon" name="logo-instagram"/>
                                        <span>Instagram</span>
                                    </a>
                                </li>
                                <li className="f-link__item">
                                    <a href="#" className="follow-link">
                                        <Twitter className="follow-link__icon" name="logo-twitter"/>
                                        <span>Twitter</span>
                                    </a>
                                </li>
                                <li className="f-link__item">
                                    <a href="#" className="follow-link">
                                        <Facebook className="follow-link__icon" name="logo-facebook"/>
                                        <span>Facebook</span>
                                    </a>
                                </li>
                                <li className="f-link__item">
                                    <a href="#" className="follow-link">
                                        <YouTube className="follow-link__icon" name="logo-youtube"/>
                                        <span>Youtube</span>
                                    </a>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div className="footer__static">
                        <div className="static__logo">
                            <a href="#">
                                <img src={logo} alt="ExShop" />
                            </a>
                            <span className="static__slogan">Explore the style you wonder.</span>
                        </div>
                        <div className="static__others">
                            <span className="copyright">© 2020 ExShop. All Rights Reserved.</span>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;