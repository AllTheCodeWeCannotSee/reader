import type { CSSProperties } from 'react'

export interface IReactReaderStyle {
  container: CSSProperties
  readerArea: CSSProperties
  titleArea: CSSProperties
  reader: CSSProperties
  swipeWrapper: CSSProperties
  prev: CSSProperties
  next: CSSProperties
  arrow: CSSProperties
  arrowHover: CSSProperties
  tocBackground: CSSProperties
  toc: CSSProperties
  tocArea: CSSProperties
  tocAreaButton: CSSProperties
  loadingView: CSSProperties
}

export const ReactReaderStyle: IReactReaderStyle = {
  container: {
    display: 'flex',
    flexDirection: 'row', // Ensure horizontal layout
    overflow: 'hidden',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  readerArea: {
    flex: 1, // Take remaining space after TOC
    position: 'relative',
    zIndex: 1,
    height: '100%',
    backgroundColor: '#161c22',
    transition: 'all .3s ease',
  },
  titleArea: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#999',
  },
  reader: {
    position: 'absolute',
    top: 50,
    left: 50,
    bottom: 20,
    right: 50,

  },
  swipeWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 200,
  },
  tocBackground: {
    position: 'absolute',
    left: 256,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  prev: {
    left: 1,
  },
  next: {
    right: 1,
  },
  arrow: {
    outline: 'none',
    border: 'none',
    background: 'none',
    position: 'absolute',
    top: '50%',
    marginTop: -32,
    fontSize: 64,
    padding: '0 10px',
    color: '#E2E2E2',
    fontFamily: 'arial, sans-serif',
    cursor: 'pointer',
    userSelect: 'none',
    appearance: 'none',
    fontWeight: 'normal',
  },
  arrowHover: {
    color: '#777',
  },
  toc: {},
  tocArea: {
    position: 'relative',
    zIndex: 10,
    width: 300,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    background: '#11161c',
    padding: '10px 0',
    flexShrink: 0, // Prevent shrinking
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  tocAreaButton: {
    userSelect: 'none',
    appearance: 'none',
    background: 'none',
    border: 'none',
    display: 'block',
    fontFamily: 'sans-serif',
    width: '100%',
    fontSize: '.9em',
    textAlign: 'left',
    padding: '.9em 1em',
    color: '#aaa',
    boxSizing: 'border-box',
    outline: 'none',
    cursor: 'pointer',
  },
  loadingView: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    color: '#ccc',
    textAlign: 'center',
    marginTop: '-.5em',
  },
}
