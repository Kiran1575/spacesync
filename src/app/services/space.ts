import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Space } from '../models/space';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  private readonly apiUrl = 'https://spacesync-backend-production.up.railway.app/api/spaces';

  private readonly defaultImages: { [type: string]: string } = {
    Coworking: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80',
    Study: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    Meeting: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=900&q=80',
    Discussion: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=80',
    Cabin: 'https://images.unsplash.com/photo-1600508773949-d0fd7ff97e1c?auto=format&fit=crop&w=900&q=80'
  };

  private readonly genericFallback =
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80';

  constructor(private http: HttpClient) {}

  getAllSpaces(): Observable<Space[]> {
    return this.http.get<Space[]>(this.apiUrl);
  }

  getSpaceById(id: number): Observable<Space> {
    return this.http.get<Space>(`${this.apiUrl}/${id}`);
  }

  resolveImage(space: { imageUrl?: string; type?: string } | null | undefined): string {
    if (space?.imageUrl && space.imageUrl.trim().length > 0) {
      return space.imageUrl;
    }
    const type = space?.type || '';
    return this.defaultImages[type] || this.genericFallback;
  }
}