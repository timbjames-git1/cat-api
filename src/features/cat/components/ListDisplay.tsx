import React from 'react';
import { HeartIcon, HeartFillIcon, ThumbsdownIcon, ThumbsupIcon } from '@primer/octicons-react'

export interface IListDisplayProps{
    onFavourite: (favoriteId: undefined | number, imgId: number, add: boolean) => void;
    onVoteDown: (id: number, currentValue: number) => void;
    onVoteUp: (id: number, currentValue: number) => void;
    favoriteId: undefined | number;
    fileName: string;
    imgId: number;
    img: string;
    isFavorite: boolean;
    voteCount: number;
}

const ListDisplay: React.FC<IListDisplayProps> = ({ onFavourite, onVoteDown, onVoteUp, favoriteId, fileName, imgId, img, isFavorite, voteCount }) => {

    const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>): void => {
        onFavourite(favoriteId, imgId, !isFavorite);
    };

    const handleVoteDown = (event: React.MouseEvent<HTMLButtonElement>): void => {
        onVoteDown(imgId, voteCount);
    };

    const handleVoteUp = (event: React.MouseEvent<HTMLButtonElement>): void => {
        onVoteUp(imgId, voteCount);
    };

    return (
        <div className="image-wrap-2" id={imgId.toString()}>            
            <div className="image-favorite">
                <button className="btn btn-outline-white py-2 px-4" onClick={handleFavorite}>
                    { isFavorite ? <HeartFillIcon /> : <HeartIcon /> }
                </button>
            </div>
            <div className="image-vote-up">
                <button className="btn btn-outline-white py-2 px-4" onClick={handleVoteUp}>
                    <ThumbsupIcon />
                </button>
            </div>
            <div className="image-vote-down">
                <button className="btn btn-outline-white py-2 px-4" onClick={handleVoteDown}>
                    <ThumbsdownIcon />
                </button>
            </div>
            <div className="image-vote-count">
                {voteCount}
            </div>
            <img alt={fileName} src={img} className="img-fluid" />
        </div>
    );
};

export {
    ListDisplay
}