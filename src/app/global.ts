import {Injectable} from '@angular/core'

@Injectable({
    providedIn : 'root'
})
export class Globals{
    public lat: number=1;
    public lon : number=2;
    public showSearchResult :boolean=false;
}