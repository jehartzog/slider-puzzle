import React from 'react';

export default class SliderBlock extends React.Component {
  render() {
    if (this.props.number === 0) {
      return <span className='slider-block slider-block_zero'></span>;
    }

    return (
        <span className='slider-block' onClick={() => this.props.onClick(this.props.number)}>
          {this.props.number}
        </span>
    );
  }
}

SliderBlock.propTypes = {
  number: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired,
};
