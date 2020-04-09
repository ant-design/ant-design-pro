/* eslint-disable no-eval */
import { Scene, LineLayer, PointLayer, PolygonLayer, Popup } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
import * as React from 'react';
import { Spin } from 'antd';

export default class Map extends React.Component<
  {},
  {
    loading: boolean;
  }
> {
  state: {
    loading: boolean;
  } = {
    loading: false,
  };

  private scene: Scene;

  private initMap() {
    this.scene = new Scene({
      id: 'map',
      map: new Mapbox({
        pitch: 20,
        // @ts-ignore
        style: 'blank',
        center: [5, 40.16797],
        zoom: 0.51329,
        minZoom: 0.2,
      }),
    });
  }

  private addLayer() {
    this.setState({
      loading: true,
    });
    Promise.all([
      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/dbd008f1-9189-461c-88aa-569357ffc07d.json',
      ).then((d) => d.json()),
      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/4472780b-fea1-4fc2-9e4b-3ca716933dc7.json',
      ).then((d) => d.text()),
      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/a5ac7bce-181b-40d1-8a16-271356264ad8.json',
      ).then((d) => d.text()),
    ]).then((res) => {
      requestAnimationFrame(() => {
        const [world, dot, flyLine] = res;
        const dotData = eval(dot);
        const flydata = eval(flyLine).map((item: any) => {
          const latLng1 = item.from.split(',').map((e: number) => e * 1);
          const latLng2 = item.to.split(',').map((e: number) => e * 1);
          return { coord: [latLng1, latLng2] };
        });

        this.setState({
          loading: false,
        });
        const worldFill = new PolygonLayer().source(world).color('#d1e0f3').shape('fill').style({
          opacity: 1,
        });

        const worldLine = new LineLayer().source(world).color('#fff').size(0.5).style({
          opacity: 0.4,
        });
        const dotPoint = new PointLayer()
          .source(dotData, {
            parser: {
              type: 'json',
              x: 'lng',
              y: 'lat',
            },
          })
          .shape('circle')
          .color('#268edc')
          .animate(false)
          .size(4)
          .style({
            opacity: 0.2,
          });
        const flyLineLayer = new LineLayer({
          blend: 'normal',
        })
          .source(flydata, {
            parser: {
              type: 'json',
              coordinates: 'coord',
            },
          })
          .color('#5b97f1')
          .shape('arc3d')
          .size(2.6)
          .animate({
            interval: 2,
            trailLength: 2,
            duration: 1,
          })
          .style({
            opacity: 1,
          });
        this.scene.addLayer(worldFill);
        this.scene.addLayer(worldLine);
        this.scene.addLayer(dotPoint);
        this.scene.addLayer(flyLineLayer);

        flyLineLayer.on('mousemove', (e) => {
          const popup = new Popup({
            offsets: [0, 0],
            closeButton: false,
          })
            .setLnglat(e.lngLat)
            .setHTML(
              "地理可视化引擎 AntV L7:  <a  target='_blank', href='https://github.com/antvis/L7'>GitHub</a>",
            );
          this.scene.addPopup(popup);
        });
      });
    });
  }

  public componentWillUnmount() {
    this.scene.destroy();
  }

  public async componentDidMount() {
    this.initMap();
    this.addLayer();
  }

  public render() {
    const { loading } = this.state;
    return (
      <>
        {loading && <Spin />}
        <div
          id="map"
          style={{
            position: 'relative',
            width: '100%',
            height: '452px',
            display: loading ? 'none' : 'block',
          }}
        />
      </>
    );
  }
}
