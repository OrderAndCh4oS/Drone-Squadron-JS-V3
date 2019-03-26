import React from 'react';

class Canvas {
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this._ref = React.createRef();
        this._canvas = <canvas ref={this._ref} width={width} height={height}/>;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get ref() {
        return this._ref;
    }

    get canvas() {
        return this._canvas;
    }

    get ctx() {
        return this._ref.current.getContext('2d');
    }
}

const canvas = new Canvas(800, 600);

export default canvas;
