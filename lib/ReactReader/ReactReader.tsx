import React, {type CSSProperties, PureComponent, type ReactNode, useState} from 'react';
import {type SwipeableProps, useSwipeable} from 'react-swipeable';
import {EpubView, type IEpubViewStyle, type IEpubViewProps} from '..';
import {type NavItem} from 'epubjs';
import {ReactReaderStyle as defaultStyles, type IReactReaderStyle} from './style';

type SwipeWrapperProps = {
    children: ReactNode,
    swipeProps: Partial<SwipeableProps>
};

const SwipeWrapper = ({children, swipeProps}: SwipeWrapperProps) => {
    const handlers = useSwipeable(swipeProps);
    return <div {...handlers}>{children}</div>;
};

type TocItemProps = {
    data: NavItem,
    setLocation: (value: string) => void,
    styles?: CSSProperties,
    currentLocation: string
};

const TocItem = ({data, setLocation, styles, currentLocation}: TocItemProps) => {
    const isActive = data.href === currentLocation;
    const [isHovering, setHovering] = useState(false);
    const itemStyles = {
        ...styles,
        color: isActive ? '#83b0e8' : (isHovering ? '#7097c7' : 'inherit')

    };

    return (
        <div>
            <button
                onMouseEnter={() => setHovering(true)}  // 鼠标进入时设置悬停为 true                onMouseLeave={() => setHovering(false)}
                onMouseLeave={() => setHovering(false)}
                onClick={() => setLocation(data.href)}
                style={itemStyles}
            >
                {data.label}
            </button>
            {data.subitems && data.subitems.length > 0 && (
                <div style={{paddingLeft: 10}}>
                    {data.subitems.map((item, i) => (
                        <TocItem
                            key={i}
                            data={item}
                            setLocation={setLocation}
                            styles={styles}
                            currentLocation={currentLocation}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export type IReactReaderProps = IEpubViewProps & {
    title?: string,
    showToc?: boolean,
    readerStyles?: IReactReaderStyle,
    epubViewStyles?: IEpubViewStyle,
    swipeable?: boolean
};

type IReactReaderState = {
    isLoaded: boolean,
    toc: NavItem[],
    currentLocation: string
};

export class ReactReader extends PureComponent<IReactReaderProps, IReactReaderState> {
    state: Readonly<IReactReaderState> = {
        isLoaded: false,
        toc: [],
        currentLocation: ""
    };
    readerRef = React.createRef<EpubView>();

    constructor(props: IReactReaderProps) {
        super(props);
    }

    next = () => {
        const node = this.readerRef.current;
        if (node && node.nextPage) {
            node.nextPage();
        }
    };

    prev = () => {
        const node = this.readerRef.current;
        if (node && node.prevPage) {
            node.prevPage();
        }
    };

    onTocChange = (toc: NavItem[]) => {
        const {tocChanged} = this.props;
        this.setState({
            toc: toc
        }, () => tocChanged && tocChanged(toc));
    };

    setLocation = (loc: string) => {
        const {locationChanged} = this.props;
        this.setState({currentLocation: loc});
        locationChanged && locationChanged(loc);
    };

    renderToc() {
        const {toc, currentLocation} = this.state;
        const {readerStyles = defaultStyles} = this.props;

        return (
            <div style={readerStyles.tocArea}>
                <div style={readerStyles.toc}>
                    {toc.map((item, i) => (
                        <TocItem
                            key={i}
                            data={item}
                            setLocation={this.setLocation}
                            styles={readerStyles.tocAreaButton}
                            currentLocation={currentLocation}
                        />
                    ))}
                </div>
            </div>);
    }

    render() {
        const {
            title,
            showToc = true,
            loadingView,
            readerStyles = defaultStyles,
            locationChanged,
            swipeable,
            epubViewStyles,
            ...props
        } = this.props;
        const {toc} = this.state;
        return (
            <div style={readerStyles.container}>
                {showToc && toc && this.renderToc()}
                <div style={readerStyles.readerArea}>
                    <div style={readerStyles.titleArea}>{title}</div>
                    <SwipeWrapper swipeProps={{
                        onSwipedRight: this.prev,
                        onSwipedLeft: this.next,
                        trackMouse: true
                    }}
                    >
                        <div style={readerStyles.reader}>
                            <EpubView ref={this.readerRef}
                                      loadingView={
                                          loadingView === undefined ? (
                                              <div style={readerStyles.loadingView}>Loading…</div>
                                          ) : (
                                              loadingView
                                          )
                                      }
                                      epubViewStyles={epubViewStyles}
                                      {...props}
                                      tocChanged={this.onTocChange}
                                      locationChanged={locationChanged}
                            />
                            {swipeable && <div style={readerStyles.swipeWrapper}/>}
                        </div>
                    </SwipeWrapper>
                    <button style={Object.assign({}, readerStyles.arrow, readerStyles.prev)}
                            onClick={this.prev}
                    >
                        ‹
                    </button>
                    <button style={Object.assign({}, readerStyles.arrow, readerStyles.next)}
                            onClick={this.next}
                    >
                        ›
                    </button>
                </div>
            </div>);
    }
}
