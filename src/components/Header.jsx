import React from 'react';
import {
    ShoppingCartOutlined,
    SearchOutlined,
    AccountCircleOutlined,
} from '@material-ui/icons';
import '../decoration/Header.css';
import logo_large from '../images/logo_large.png';
import logo_small from '../images/logo_small.png';
// import PropTypes from 'prop-types';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <React.Fragment>
                <header className="ex-header">
                    <div className="l-wrapper">
                        <div className="inner-header">
                            <div className="inner-header__leftside">
                                <div className="header__logo">
                                    <a href="#">
                                        <picture>
                                            <source media="(max-width: 900px)" srcSet={logo_small} />
                                            <img className="brand" src={logo_large} alt="Sample" />
                                        </picture>
                                    </a>
                                </div>
                                <div className="header__search">
                                    <form action="" className="search">
                                        <div className="search__dropdown">
                                            <select name="category" id="search-category">
                                                <option value="brand">品牌名稱</option>
                                                <option value="item">商品名稱</option>
                                            </select>
                                        </div>
                                        <div className="search__input">
                                            <input type="search" placeholder="搜尋你想要的品牌或商品..." />
                                        </div>
                                        <button className="search__submit" type="button">搜尋</button>
                                    </form>
                                </div>
                            </div>
                            <div className="header__rightside">
                                <button className="rightside__searchBtn tab">
                                    <div className="tab-icon">
                                        <SearchOutlined id="searchbtn" className="tab-icon__icon" />
                                    </div>
                                </button>
                                <button className="rightside__sign tab">
                                    <span>註冊/登入</span>
                                    <div className="tab-icon">
                                        <AccountCircleOutlined id="account" className="tab-icon__icon" />
                                    </div>
                                </button>
                                <button className="rightside__shopcart tab">
                                    <div className="tab-icon">
                                        <ShoppingCartOutlined id="shopcart" className="tab-icon__icon" />
                                        <span className="tab-icon__label">9</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <nav className="nav-header">
                            <ul className="main-nav__list">
                                <li className="main-nav__item all-commodity">
                                    <div className="nav-item__title">全館分類</div>
                                    <div className="nav-item__content"></div>
                                </li>
                                <li className="main-nav__item">
                                    <div className="nav-item__title">新品上市</div>
                                    <div className="nav-item__content"></div>
                                </li>
                                <li className="main-nav__item">
                                    <div className="nav-item__title">熱銷排行榜</div>
                                    <div className="nav-item__content"></div>
                                </li>
                                <li className="main-nav__item">
                                    <div className="nav-item__title">季節限定</div>
                                    <div className="item__content"></div>
                                </li>
                                <li className="main-nav__item">
                                    <div className="nav-item__title">限時特價</div>
                                    <div className="nav-item__content"></div>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </header>
            </React.Fragment>
        );
    }
}

export default Header;