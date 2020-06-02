import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { minBy, noop, indexOf, find } from 'lodash';
import style from './style.scss';
import { RouteComponentProps, useParams, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useConfiguratorActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { CarWidget, InteractionPanel, TrimsPanel, ColorPanel, Loader } from 'app/components';
import { TrimModel, ColorModel } from 'app/models';

export namespace CarConfigurator {
  export interface Props extends RouteComponentProps<void> {}
}

const findCheapestColor = (colors: ColorModel[]) => minBy(colors, (item: ColorModel) => item.price);
const findColorByName = (colors: ColorModel[], colorName: string) => find(colors, ({ name }) => colorName === name);
const slugs = ['trims', 'colors'];

export const CarConfigurator = withRouter(({ history }: CarConfigurator.Props) => {
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
    const { colors } = trim;
    let colorValue = color.name ? findColorByName(colors, color.name) : findCheapestColor(colors);
    colorValue = colorValue || findCheapestColor(colors);
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

  const onCompleteCallback = useCallback(async () => {
    const status = await configuratorActions.checkoutCarConfiguration(carData.name, color.name, trim.name);
    history.push(`/checkout/${status}`);
  }, [color]);

  const Steps = [
    <TrimsPanel className={style.innerPanel} setTrim={setTrim} trims={carData.trims} name={trim.name} />,
    <ColorPanel className={style.innerPanel} setColor={setColor} colors={trim.colors} name={color.name} />
  ];

  if (loading) {
    return <Loader />
  }

  return (
    <div className={style.page}>
      {carWidget}
      <InteractionPanel code={code} step={indexOf(slugs, config)} steps={Steps} onComplete={onCompleteCallback} />
    </div>
  );
});
