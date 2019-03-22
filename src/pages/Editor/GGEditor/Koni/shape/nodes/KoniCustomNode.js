import React from 'react';
import { RegisterNode } from 'gg-editor';

class KoniCustomNode extends React.Component {
  render() {
    const config = {
      draw(item) {
        const keyShape = this.drawKeyShape(item);

        // draw label
        this.drawLabel(item);

        // draw image
        const group = item.getGraphicGroup();
        const model = item.getModel();

        group.addShape('image', {
          attrs: {
            x: -7,
            y: -7,
            img: model.icon,
          },
        });

        return keyShape;
      },
    };

    return <RegisterNode name="koni-custom-node" config={config} />;
  }
}

export default KoniCustomNode;
