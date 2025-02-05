export interface NasaGallery {
  title: string;
  url: string;
  media_type: 'image' | 'video';
  explanation?: string; 
  date?: string;
  copyright?: string;
}
