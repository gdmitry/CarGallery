import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { minBy, noop, indexOf } from 'lodash';
import style from './style.scss';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useConfiguratorActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { CarWidget, InteractionPanel, TrimsPanel, ColorPanel } from 'app/components';
import { TrimModel, ColorModel } from 'app/models';

export namespace CarConfigurator {
  export interface Props extends RouteComponentProps<void> {}
}

export const CarConfigurator = (props: CarConfigurator.Props) => {
  const dispatch = useDispatch();
  const configuratorActions = useConfiguratorActions(dispatch);
  const { code, config } = useParams();
  const [trim, setTrim] = useState({ name: '', price: 0, colors: [] });
  const [color, setColor] = useState({ name: '', price: 0, imageUrl: '' });
  const [totalPrice, setTotalPrice] = useState(0);

  const { carData, loading } = useSelector((state: RootState) => {
    return {
      carData: state.configurator.data,
      loading: state.configurator.isLoading
    };
  });

  useEffect((): void => {
    configuratorActions.requestCarConfiguration(code);
  }, [code]);

  useEffect((): void => {
    const trimValue = minBy(carData.trims, (item: TrimModel) => item.price);
    trimValue ? setTrim(trimValue) : noop;
  }, [carData]);

  useEffect((): void => {
    const colorValue = minBy(trim.colors, (item: ColorModel) => item.price);
    colorValue ? setColor(colorValue) : noop;
  }, [trim]);

  useEffect((): void => {
    setTotalPrice(trim.price + color.price);
  }, [trim, color]);

  const carWidget = useMemo(() => color
    ? <CarWidget
      className={style.overview}
      model={carData.name}
      color={color.name}
      imageUrl={color.imageUrl}
      trim={trim.name}
      price={totalPrice}
    />
    : null, [color, totalPrice]);

  const onCompleteCallback = useCallback(() => {
    console.log("completed")
  }, []);

  const Steps = [
    <TrimsPanel setTrim={setTrim} trims={carData.trims} name={trim.name} />,
    <ColorPanel setColor={setColor} colors={trim.colors} name={color.name} />
  ];

  const slugs = ['trims', 'colors'];

  return (
    <div className={style.page}>
      {carWidget}
      <InteractionPanel step={indexOf(slugs, config)} className={style.panel} steps={Steps} onComplete={onCompleteCallback} />
    </div>
  );
};
