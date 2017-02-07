import React from 'react';

export default class SliderBlock extends React.Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    if (this.refs.canvas == null) {
      return;
    }

    const ctx = this.refs.canvas.getContext('2d');
    const img = new Image();
    img.src = '/test.gif';

    const dWidth = this.refs.canvas.width;
    const dHeight = this.refs.canvas.height;
    const sWidth = img.width / 3;
    const sHeight = img.height / 3;

    const grid = {
      row: this.props.number % 3,
      col: Math.floor(this.props.number / 3),
    };

    img.onload = () => {
      ctx.drawImage(img,
                    sWidth * grid.row,
                    sHeight * grid.col,
                    sWidth,
                    sHeight,
                    0, 0, dWidth, dHeight,
      );
    };
  }

  render() {
    if (this.props.number === 0) {
      return (
        <span className='slider-block slider-block_zero'>
        </span>
      );
    }

    return (
        <span className='slider-block' onClick={() => this.props.onClick(this.props.number)}>
          <canvas ref="canvas" />
        </span>
    );
  }
}

SliderBlock.propTypes = {
  number: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired,
};
