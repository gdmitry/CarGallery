import React from 'react';
import style from './style.scss';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCarActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { CarItem } from 'app/components';

export namespace CarGrid {
  export interface Props extends RouteComponentProps<void> {}
}

export const CarGrid = (props: CarGrid.Props): JSX.Element => {
  const dispatch = useDispatch();
  const carsActions = useCarActions(dispatch);

  const { cars, loading } = useSelector((state: RootState) => {
    return {
      cars: state.cars.data,
      loading: state.cars.isLoading
    };
  });
console.log(cars, loading)
  React.useEffect((): void => {
    carsActions.requestCars();
  }, []);

  const gridItems = React.useMemo(() => cars.map(({ name, priceFrom, imageUrl, code }) =>
    <CarItem
      className={style.gridItem}
      key={code} title={name}
      price={priceFrom}
      imageUrl={imageUrl}
      linkTo={`models/${code}/trims`}
    />
  ), [cars]);

  return (
    <div className={style.page}>
      <h1>CHOOSE YOUR NEW CAR</h1>
      <div className={style.grid}>{gridItems}</div>
    </div>
  );
};
