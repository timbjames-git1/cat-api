import { AxiosResponse } from 'axios';

import http from '../../../common/http-client';
import { IApiFavorite, IApiImages, IApiVote } from '../interfaces/interfaces';

class CatService {

    private subId: undefined | string = process.env.REACT_APP_SUB_ID?.toString();
    private pageSize = Number(process.env.REACT_APP_PAGE_SIZE);

    public deleteFavorite = (id: number): Promise<AxiosResponse<{}>> => {
        return http.delete(`/favourites/${id}`);
    }

    public getFavourites = (): Promise<AxiosResponse<IApiFavorite[]>> => {
        return http.get(`/favourites?sub_id=${this.subId}`);
    }

    public getCats = (): Promise<AxiosResponse<IApiImages[]>> => {
        return http.get('/images/search?limit=10&page=1&size=500');
    }

    public getMyCats = (currentPage: number): Promise<AxiosResponse<IApiImages[]>> => {
        return http.get(`/images?limit=${this.pageSize}&page=${currentPage - 1}&sub_id=${this.subId}`);
    }

    public getVotes = (): Promise<AxiosResponse<IApiVote[]>> => {
        return http.get(`/votes?limit=100&page=0&sub_id=${this.subId}`);
    }

    public setFavorite = (id: number): Promise<AxiosResponse<{}>> => {
        return http.post('/favourites', { image_id: id, sub_id: this.subId });
    }  

    public upload = (file: File, onUploadProgress: (progressEvent: any) => void) => {

        let formData = new FormData();
  
        formData.append('file', file);
        formData.append('sub_id', this.subId || '');
  
        return http.post('/images/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress
        });
    }

    public vote = (imgId: number, newValue: number) => {
        return http.post('/votes', { image_id: imgId, sub_id: this.subId, value: newValue });
    }
}
  
export default new CatService();