import React from 'react';
import { Row, Col } from 'antd';
import tinycolor from 'tinycolor2';

const Color = () => {
  const colors = new Array(10).fill(1);

  const handleColor = e => {
    const rgb = window.getComputedStyle(e.target).backgroundColor;
    const color = tinycolor(rgb).toHexString();
    if (e.target.lastElementChild) {
      e.target.lastElementChild.innerText = color;
    }
  };

  return (
    <div className="color">
      <Row className="blue">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`blue-${i + 1}`}>
            @blue-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="red">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`red-${i + 1}`}>
            @red-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="purple">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`purple-${i + 1}`}>
            @purple-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="geekblue">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`geekblue-${i + 1}`}>
            @geekblue-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="green">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`green-${i + 1}`}>
            @green-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="orange">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`orange-${i + 1}`}>
            @orange-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="gold">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`gold-${i + 1}`}>
            @gold-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="yellow">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`yellow-${i + 1}`}>
            @yellow-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="cyan">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`cyan-${i + 1}`}>
            @cyan-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="magenta">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`magenta-${i + 1}`}>
            @magenta-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="pink">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`pink-${i + 1}`}>
            @pink-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="volcano">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`volcano-${i + 1}`}>
            @volcano-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="lime">
        {colors.map((item, i) => (
          <Col onMouseEnter={handleColor} className={`lime-${i + 1}`}>
            @lime-{i + 1}
            <p />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Color;
