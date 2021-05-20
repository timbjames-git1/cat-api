import React from 'react';
import { render, screen, queryByAttribute } from '@testing-library/react';
import { ListDisplay, IListDisplayProps } from './ListDisplay';

const getById = queryByAttribute.bind(null, 'id');

const setup = (): JSX.Element => {

    const favoriteId: number = 0;
    const fileName: string = '';
    const imgId: number = 0;
    const img: string = '';
    const isFavorite: boolean = false;
    const voteCount: number = 0;

    const props: IListDisplayProps = {
        onFavourite: () => {},
        onVoteDown: () => {},
        onVoteUp: () => {},
        favoriteId,
        fileName,
        imgId,
        img,
        isFavorite,
        voteCount
    };

    return <ListDisplay {...props} />
};

test('renders Vote count as 0', () => {
  const domElement = render(setup());
  const divElement = getById(domElement.container, '0');
  expect(divElement).toBeInTheDocument();
});