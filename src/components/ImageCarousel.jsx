import React, { Component } from 'react';
import {ArrowBackIosOutlined, ArrowForwardIosOutlined} from '@material-ui/icons';
import PropTypes from 'prop-types';
import '../decoration/ImageCarousel.css';

function lerp(a, b, n) {
    return (1 - n) * a + n * b;
}
function floor(n) {
    const sign = (n >= 0) ? 1 : -1;
    const magnitude = Math.floor(Math.abs(n));

    return sign * magnitude;
}
/**
 * Return touch event target (information for pointer location)
 * 
 * @param {TouchEvent} e - Touch event from users
 */
function getTouchClient(e) {
    return e.targetTouches[0];
}

const ImageCarouselDot = (props) => {
    const activeClass = props.isActive? 'image-carousel__dot--active': '';

    if('ontouchstart' in window) {
        return (
            <div
                className = {`image-carousel__dot ${activeClass}`}
                onTouchStart = {() => props.handleClick(props.offset)}
            >
            </div>
        );
    }
    return (
        <div
            className = {`image-carousel__dot ${activeClass}`}
            onClick = {() => props.handleClick(props.offset)}
        >
        </div>
    );
}

const ImageCarouselItem = (props) => {
    const {children, size, unit} = props;
    const clonedClass = (props.isCloned) ? 'image-carousel__item--cloned' : '';
    const activeClass = (props.isActive) ? 'image-carousel__item--active' : '';

    return (
        <li 
            className={`image-carousel__item ${clonedClass} ${activeClass}`}
            style = {{
                'flex': `0 0 ${size}${unit}`
            }}
        >
            {children}
        </li>
    );
}

class ImageCarousel extends Component {
    static defaultConfig = {
        unit: '%',
        slideToShow: 1,
        slideToScroll: 1,
        draggable: false,
        scrollable: false,
        infinite: false,
        auto: false,
        dots: false,
        dragSpeed: 1.5,
        ease: 0.1,
    }; 
    constructor(props) {
        super(props);
        this.state = {
            size: 0,
            unit: '%',

            length: 0,
            offset_start: 0,
            offset_end: -1,
            slideToShow: 0,
            slideToScroll: 0,
            activeDotIndex: 0,
            
            draggable: false,
            dragSpeed: 1.5,
            dragOffset: 0,
            ease: 0.1,
        };
        this.minIndex = 0;
        this.maxIndex = props.children.length - 1;

        this.adjustCarousel = this.adjustCarousel.bind(this);
        this._onResize = this._onResize.bind(this);
        this._onTransitionEnd = this._onTransitionEnd.bind(this);
        this._handlePrev = this._handlePrev.bind(this);
        this._handleNext = this._handleNext.bind(this);
        this.clickDot = this.clickDot.bind(this);
        this.bindDragEvents = this.bindDragEvents.bind(this);

        this.isTouch = false;
        this.isDragging = false;
        this.isProgress = false;
        this.isHover = false;
        this.isDragStop = true;
        this.startTime = 0;
        this.endTime = 0;

        this.mouseonX = 0;
        this.currentX = 0;
        this.lastX = 0;
        this.rAF = undefined;
        this.autoAniInterval = null;

        this.bindDragEvents();
    }

    bindDragEvents() {        
        [
            'run',
            'setPos',
            'dragStart',
            'dragEnd',
            'addDragEvents',
            'removeDragEvents',
            'requestAnimationFrame',
            'cancelAnimationFrame',

        ].forEach((fn) => {            
            this[fn] = this[fn].bind(this);
        });
    }

    componentDidMount() {
        this._onResize();
        window.addEventListener('resize', this._onResize);
        
        this._list.addEventListener('transitionend', this._onTransitionEnd);
        
        this._wrapper.addEventListener('mouseenter', () => {
            this.isHover = true;
            this.clearAutoPlay();
        });
        this._wrapper.addEventListener('mouseleave', (e) => {
            this.isHover = false;

            if(this.isDragging)
                this.dragEnd(e);

            if(this.state.auto && !this.autoAniInterval) {
                this.setAutoPlay('mouse leave');
            }
        });
    }
    componentWillUnmount() {
        this.clearAutoPlay();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.draggable !== this.state.draggable) {
            if(nextState.draggable) {
                // add drag event
                this.addDragEvents();
            } else {
                // remove drag event
                this.removeDragEvents();
            }
        }
        
        return true;
    }
    run() {
        const {ease} = this.state;
        this.lastX = lerp(this.lastX, this.currentX, ease);
        this.lastX = floor(this.lastX);

        // only when dragging or dragend(fail to slide over) need to update dragOffset
        if(this.isDragging || !this.isDragStop ) {
            this.setState((prevState) => {
                return {
                    dragOffset: this.getDragOffset(),
                };
            });
        }
        this.isDragStop = this.lastX === 0 && !this.isDragging;

        this.requestAnimationFrame();
    }
    /**
     * Set mouse/finger target location when dragging
     * 
     * @param {Event} e 
     */
    setPos(e) {
        const {dragSpeed} = this.state;
        const wrapperRect = this._wrapper.getBoundingClientRect();
        let magnitude;
        e.preventDefault();

        if(!this.isDragging)
            return;        
        if(this.isTouch)
            e = getTouchClient(e);

        this.currentX = (e.clientX - wrapperRect.left - this.mouseonX) * dragSpeed;
        magnitude = (this.currentX >= 0) ? 1 : -1;

        this.currentX = magnitude * Math.min(Math.abs(this.currentX), wrapperRect.width / 2);
        this.currentX *= 100;
    }
    /**
     * Record drag start information
     * 
     * @param {Event} e 
     */
    dragStart(e) {
        const wrapperRect = this._wrapper.getBoundingClientRect();
        e.preventDefault();

        if(this.isProgress)
            return;
        if(this.isTouch) {
            e = getTouchClient(e);
        }
        // stop auto play no matter carousel is set to auto play
        this.clearAutoPlay();

        this.isDragging = true;
        this.isDragStop = false;
        this.mouseonX = e.clientX - wrapperRect.left;
        this.startTime = Date.now(); // include milliseconds
        this._wrapper.classList.add('dragging');
    }
    /**
     * Calculate if drag is successful and remove dragging mode
     * 
     * @param {Event} e 
     */
    dragEnd(e) {
        const wrapper_width = this._wrapper.clientWidth;
        const dragRatio = Math.abs( this.lastX / wrapper_width ) / 100;
        let dragSuccess = false;
        e.preventDefault();

        if(this.isProgress || !this.isDragging)
            return;
        
        // include milliseconds
        this.endTime = Date.now();
        // depend on drag ratio and drag velocity(unit: px/s)
        if( dragRatio >= 0.2 || this.calcDragVelocity() >= 300.0 ) {
            let handleMove = (this.lastX > 0) ? this._handlePrev : this._handleNext;

            if(dragSuccess = handleMove()) {
                this.lastX = 0;
                this.setState({
                    dragOffset: 0,
                });
            }
        }
        if(!dragSuccess && this.state.auto && !this.isHover && !this.autoAniInterval)
            this.setAutoPlay('drag end');

        this.isDragging = false;
        this.currentX = 0;
        this._wrapper.classList.remove('dragging');
    }
    getDragOffset = () => {
        const {unit} = this.state;
        const wrapper_width = this._wrapper.clientWidth;

        if(unit === '%') {
            // because lastX is multiplied by 100, it doesn't need to be divided by 100 again.
            return this.lastX / wrapper_width;
        }
        
        return this.lastX / 100;
    }
    calcDragVelocity = () => {
        const elaspedTime = this.endTime - this.startTime;

        if(elaspedTime === 0)
            return 0;

        // because currentX and lastX are 100 times to avoid precision problem
        // So, we only need to multiply by 10 instead of 1000.
        return Math.abs(this.currentX * 10 / elaspedTime);
    }
    addDragEvents() {
        this.run();

        if('ontouchstart' in window) {
            this.isTouch = true;
            this._wrapper.addEventListener('touchmove', this.setPos, false);
            this._wrapper.addEventListener('touchstart', this.dragStart, false);
            this._wrapper.addEventListener('touchend', this.dragEnd, false);
        } else {
            this._wrapper.addEventListener('mousemove', this.setPos, false);
            this._wrapper.addEventListener('mousedown', this.dragStart, false);
            this._wrapper.addEventListener('mouseup', this.dragEnd, false);
        }
    }
    removeDragEvents() {
        this.cancelAnimationFrame();

        if('ontouchstart' in window) {
            this._wrapper.removeEventListener('touchmove', this.setPos, false);
            this._wrapper.removeEventListener('touchstart', this.dragStart, false);
            this._wrapper.removeEventListener('touchend', this.dragEnd, false);
        } else {
            this._wrapper.removeEventListener('mousemove', this.setPos, false);
            this._wrapper.removeEventListener('mousedown', this.dragStart, false);
            this._wrapper.removeEventListener('mouseup', this.dragEnd, false);
        }
    }
    requestAnimationFrame() {
        this.rAF = requestAnimationFrame(this.run);
    }
    cancelAnimationFrame() {
        cancelAnimationFrame(this.rAF);
    }

    _onResize() {
        const {responsive: res, default_setting} = this.props;
        let targetSetting = default_setting;
        let defaultConfig = {
            unit: '%',
            draggable: false,
            infinite: false,
            auto: false,
            dots: false,
            dragSpeed: 1.5,
            ease: 0.1,
        };

        res.forEach((media) => {
            let cssMedia = window.matchMedia(`(max-width: ${media.breakpoint}px)`);

            if(cssMedia.matches) {
                targetSetting = media.setting;
            }
        });

        targetSetting = {
            ...ImageCarousel.defaultConfig,
            ...targetSetting,
        };        

        this.adjustCarousel(targetSetting);
    }
    _onTransitionEnd() {
        const {
            offset_start,
            infinite,
            slideToShow,
            length,
            auto
        } = this.state;
        const isCloned = (offset_start <= (slideToShow - 1) || offset_start >= length - slideToShow);

        this.isProgress = false;
        this._list.style.transition = '';

        if(infinite && isCloned) {
            if(offset_start <= slideToShow - 1)
                this.moveTo(length - 2 * slideToShow, false);
            else
                this.moveTo(slideToShow, false);
        }
        if(auto && !this.isHover && !this.autoAniInterval) {
            this.setAutoPlay('transition end');
        }
    }
    /**
     * 
     * @param {MediaQueryList} cssMedia - css media query
     * @param {Object} setting - carousel setting
     */
    adjustCarousel(setting) {
        const {slideToShow, unit, infinite, auto} = setting;
        let carousel_length = this.props.children.length;
        let size =  `${100 / slideToShow}`;

        if(unit === 'px') {
            const wrapper_size = this._wrapper.clientWidth;
            size = `${wrapper_size / slideToShow}`;
        }
        if(infinite)
            carousel_length += slideToShow * 2;

        this.clearAutoPlay();
        if(auto)
            this.setAutoPlay('adjust carousel');

        this.setState((prevState) => {
            let newOffsetStart = prevState.offset_start;
            let newOffsetEnd;

            if(infinite)
                newOffsetStart += slideToShow;
            if(prevState.infinite) {
                newOffsetStart += -prevState.slideToShow;
            }
            newOffsetEnd = newOffsetStart + (slideToShow - 1);

            return {
                ...setting,
                length: carousel_length,
                size,
                offset_start: newOffsetStart,
                offset_end: newOffsetEnd,
            };
        });
    }
    
    _handlePrev() {
        const {
            offset_start,
            slideToScroll,
            slideToShow,
            infinite,
        } = this.state;
        const restForInfinite = offset_start - slideToShow;
        let scrollOffset = -slideToScroll;

        // general case for bounds
        if(offset_start + scrollOffset < 0)
            scrollOffset = -offset_start;
        // special case for infinite
        if( infinite && (restForInfinite > 0 && restForInfinite < slideToScroll) )
            scrollOffset = -restForInfinite;

        if(scrollOffset === 0)
            return false;
        
        return this.move(scrollOffset);
    }
    
    _handleNext() {
        const {
            offset_end,
            slideToScroll,
            slideToShow,
            infinite,
            length
        } = this.state;
        const restForInfinite = length - 1 - slideToShow - offset_end;
        let scrollOffset = slideToScroll;

        // general case for bounds
        if(offset_end + scrollOffset >= length)
                scrollOffset = length - 1 - offset_end;

        // special case for infinite
        if( infinite && (restForInfinite > 0 && restForInfinite < slideToScroll) )
            scrollOffset = restForInfinite;

        if(scrollOffset === 0)
            return false;

        return this.move(scrollOffset);
    }
    clickDot(targetIndex) {
        this.clearAutoPlay();
        this.moveTo(targetIndex);
    }
    /**
     * Move carousel by specific offset
     *
     * @param {Number} scrollOffset - scroll offset, 0 will be ignored
     */
    move = (scrollOffset, isAnimation = true) => {
        const {offset_start, offset_end, length} = this.state;

        if(scrollOffset === 0 || this.isProgress)
            return false;
        if((offset_start + scrollOffset) < 0 || (offset_end + scrollOffset) >= length)
            return false;

        this.isProgress = isAnimation;
        this._list.style.transition = (isAnimation) ? 'transform 0.4s ease' :'';
        this.setState((prevState) => {
            return {
                offset_start: prevState.offset_start + scrollOffset,
                offset_end: prevState.offset_end + scrollOffset,
                activeDotIndex: this.getActualPageIndex(prevState.offset_start + scrollOffset),
            };
        });

        return true;
    }
    moveTo = (targetIndex, isAnimation = true) => {
        const {offset_start, slideToShow, length} = this.state;

        if(offset_start === targetIndex || this.isProgress)
            return false;
        if(targetIndex < 0 || targetIndex > (length - slideToShow))
            return false;
        
        this.isProgress = isAnimation;
        this._list.style.transition = (isAnimation) ? 'transform 0.4s ease' :'';
        this.setState((prevState) => {
            return {
                offset_start: targetIndex,
                offset_end: targetIndex + (slideToShow - 1),
                activeDotIndex: this.getActualPageIndex(targetIndex),
            };
        });

        return true;
    }
    createItems = () => {
        const originItems = React.Children.toArray(this.props.children);
        const {
            size,
            unit,
            infinite,
            slideToShow,
            offset_start,
        } = this.state;        

        // if no-loop, then directly transform items into ImageCarouselItem
        if(!infinite)
            return originItems.map((item, index) => {
                return (
                    <ImageCarouselItem
                        key={index} 
                        size = {size}
                        unit = {unit}
                        isActive = {offset_start === index}
                    >
                        {item}
                    </ImageCarouselItem>
                );
            });
        else {
            // Clone first 4 items and last 4 items
            const firstfour = originItems.slice(0, slideToShow);
            const lastfour = originItems.slice(-slideToShow);

            return [...lastfour, ...originItems, ...firstfour].map((item, index) => {
                const isCloned = (index <= (slideToShow - 1) || index >= originItems.length + slideToShow);

                return (
                    <ImageCarouselItem
                        key={index} 
                        size = {size}
                        unit = {unit}
                        isCloned = {isCloned}
                        isActive = {offset_start === index}
                    >
                        {item}
                    </ImageCarouselItem>
                );
            });
        }
    }
    createDots = () => {
        const {slideToShow, infinite, activeDotIndex} = this.state;
        const dots = React.Children.toArray(this.props.children).filter((child, index) => {
            if(index % slideToShow === 0) {
                return true;
            }
            return false;
        });
        
        return dots.map((dot, index) => {
            let active = (index === activeDotIndex);
            let moveToOffset = index * slideToShow;

            if(infinite)
                moveToOffset += slideToShow;

            return (
                <ImageCarouselDot
                    key = {index}
                    offset = {moveToOffset}
                    handleClick = {this.clickDot}
                    isActive = {active}
                />
            );
        });
    }
    getActualPageIndex = (offset) => {
        const carousel_length = React.Children.count(this.props.children);
        const {infinite, slideToShow} = this.state;
        let actualOffsetInOrigin = offset;

        if(infinite) {
            if(offset < slideToShow)
                actualOffsetInOrigin = carousel_length - 1 - offset;
            else if(offset >= carousel_length + slideToShow)
                actualOffsetInOrigin = offset - carousel_length - slideToShow;
            else
                actualOffsetInOrigin = offset - slideToShow;
        }
        return Math.floor(actualOffsetInOrigin / slideToShow);
    }
    isReachFirst = () => {
        const {infinite, offset_start} = this.state;

        if(infinite)
            return false;
        
        return (offset_start === 0);
    }
    isReachLast = () => {
        const {infinite, offset_end, length} = this.state;

        if(infinite)
            return false;
        
        return (offset_end === length - 1);
    }
    clearAutoPlay = () => {
        clearInterval(this.autoAniInterval);
        this.autoAniInterval = null;
    }
    setAutoPlay = (str) => {
        // console.log(str);
        this.autoAniInterval = setInterval(() => {
            this._handleNext();
        }, 4000);
    }

    render() {
        const {
            offset_start,
            activeDotIndex,
            size,
            unit,
            draggable,
            scrollable,
            dots,
            dragOffset,
        } = this.state;
        const items = this.createItems();
        let listStyle = {
            transform: `translateX(${-offset_start * size}${unit})`
        };
        const scrollableClass = (scrollable && !draggable)? 'scroll' : 'no-scroll';

        if(draggable) {
            listStyle.transform = `translateX(${-offset_start * size + dragOffset}${unit})`
        }

        return ( 
            <div className="image-carousel">
                <div
                    className={`image-carousel__itemlist-wrapper ${scrollableClass}`}
                    ref = {w => (this._wrapper = w)}
                >
                    <ul
                        className="image-carousel__itemlist"
                        style={listStyle}
                        ref = {l => (this._list = l)}
                    >
                        {items}
                    </ul>                    
                </div>
                { (!this.isReachFirst()) && (
                    <div 
                        className="image-carousel__arrow image-carousel__arrow--prev"
                        onClick = {() => {
                            this.clearAutoPlay();
                            this._handlePrev();
                        }}
                    >
                        <ArrowBackIosOutlined style={{fontSize: `16px`}} />
                    </div>
                )}
                { (!this.isReachLast()) && (
                    <div
                        className="image-carousel__arrow image-carousel__arrow--next"
                        onClick = {() => {
                            this.clearAutoPlay();
                            this._handleNext();
                        }}
                    >
                        <ArrowForwardIosOutlined style={{fontSize: `16px`}} />
                    </div>
                )}
                {
                    (dots) && (
                        <div className="image-carousel__dot-list">
                            {this.createDots(activeDotIndex)}
                        </div>
                    )
                }
            </div>
        );
    }
}

ImageCarousel.propTypes = {
    default_setting: PropTypes.object.isRequired,
    responsive: PropTypes.array,
};

/**
 * default_setting:
 * - slideToShow: the number of slides to be displayed
 * - slideToScroll: the number of slides to be scrolled at once
 * - draggable: if slides are draggable or not
 * - infinite: if slides play is loop
 * - unit: '%' | 'px'
 * - dots: boolean, if display dots at bottom
 */
ImageCarousel.defaultProps = {
    default_setting: ImageCarousel.defaultConfig,
    responsive: [],
};
 
export default ImageCarousel;