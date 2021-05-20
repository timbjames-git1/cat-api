import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

import { IListDisplayProps, ListDisplay } from '../components/ListDisplay';
import { IPaginationProps, Pagination } from '../components/Pagination';
import { IApiFavorite, IApiImages, IApiVote } from '../interfaces/interfaces';

import CatService from '../services/cat.service';

import catGif from './cat-loader.gif';
import noCats from './tim0.jpg';

const CatList: React.FC = () => {

    const emptyCatList: IApiImages[] = [];
    const [catList, setCatList] = useState(emptyCatList);

    const [catListLoaded, setCatListLoaded] = useState(false);
    
    const emptyFavorites: IApiFavorite[] = [];
    const [myFavorites, setMyFavorites] = useState(emptyFavorites);

    const emptyVoteList: IApiVote[] = [];
    const [voteList, setVoteList] = useState(emptyVoteList);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const getMyCats = (page: number) => {
        CatService.getMyCats(page).then((response: AxiosResponse<IApiImages[]>) => {
            const totalCount = Number(response.headers['pagination-count']);

            setTotalCount(totalCount);
            setCatList(response.data);
            setCatListLoaded(true);
        });
    }

    const getFavorites = () => {
        CatService.getFavourites().then((response: AxiosResponse<IApiFavorite[]>) => {
            setMyFavorites(response.data);
            getMyCats(currentPage);
        });
    };

    const getVotes = () => {
        CatService.getVotes().then((response: AxiosResponse<IApiVote[]>) => {
            setVoteList(response.data);
        });
    }

    useEffect(() => {
        // interval added just to show off cat loader to take into consideration slow api connection.
        setTimeout(() => {
            getFavorites();
            getVotes();
        }, 1000);
    }, []);

    const hasCats = catList && catList.length > 0;

    const paginationProps: IPaginationProps = {
        currentPage,
        onPageChange: (page: number) => {
            setCurrentPage(page);
            setCatList([])
            setCatListLoaded(false);
            getMyCats(page);
        },
        pageSize: Number(process.env.REACT_APP_PAGE_SIZE),
        totalCount
    };

    return (
        <>
            <div className="row justify-content-md-center">
                {
                    hasCats && catList.map(x => {
                        
                        const matchingFavorite = myFavorites && myFavorites.find(y => y.image_id === x.id);
                        const matchingVote = voteList && voteList.find(y => y.image_id === x.id);

                        const listDisplayProps: IListDisplayProps = {
                            favoriteId: matchingFavorite && matchingFavorite.id,
                            fileName: x.original_filename,
                            imgId: x.id,
                            img: x.url,
                            isFavorite: matchingFavorite !== undefined,
                            onFavourite: (favoriteId: undefined | number, imgId: number) => {

                                const add = favoriteId === undefined || favoriteId === null;
                                const method = add ? CatService.setFavorite : CatService.deleteFavorite;
                                const id = add ? imgId : favoriteId as number;
                                
                                method(id).then(() => {
                                    getFavorites();
                                });
                            },
                            onVoteDown: (voteId: number, currentValue: number) => {

                                CatService.vote(voteId, currentValue - 1).then(() => {
                                    getVotes();
                                });
                            },
                            onVoteUp: (id: number, currentValue: number) => {

                                CatService.vote(id, currentValue + 1).then(() => {
                                    getVotes();
                                });
                            },
                            voteCount: (matchingVote && matchingVote.value) || 0
                        };

                        return (
                            <div key={x.id} className="col-lg-3 boo">
                                <ListDisplay {...listDisplayProps} />
                            </div>
                        );
                    })
                }
                {
                    (!hasCats && catListLoaded) && (
                        <div className="col col-12 col-md-8 col-lg-6 text-center">
                            <h3>Seems like you don't currently own any cats. Please click on <a href="/upload">"Upload"</a> to start uploading your favorite cat pictures.</h3>
                            <img alt="No cats found" src={noCats} />
                        </div>
                    )
                }    
                {
                    !catListLoaded && (
                        <div className="col col-12 col-md-8 col-lg-6 text-center">
                            <h3>Loading your cats...</h3>
                            <img alt="loading content" src={catGif} />
                        </div>
                    )
                }        
            </div>
            
            <div className="row justify-content-md-center">
                <div className="col col-12">
                    {
                        hasCats && (
                            <Pagination {...paginationProps} />
                        )                
                    }
                </div>
            </div>
        </>
    );
};

export {
    CatList
}