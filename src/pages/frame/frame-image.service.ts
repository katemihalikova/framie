import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Transfer } from 'ionic-native';

import * as CONFIG from '../../config';

@Injectable()
export class FrameImageService {
  constructor(private http: Http) {}

  getRemoteImages(): Promise<string[]> {
    return this.http.get(CONFIG.url + "files.txt")
      .toPromise()
      .then((res: Response) => res.text().split("\n"))
      .catch(errLogger("files.txt"))
      .catch(() => []);
  }

  downloadImage(image: string): Promise<any> {
    const fileTransfer = new Transfer();
    let url = CONFIG.url + image;
    return fileTransfer.download(url, cordova.file.dataDirectory + image)
      .then(entry => image)
      .catch(errLogger(image))
      .catch(() => null);
  }

  getLocalImages(): string[] {
    let imagesJson: string = localStorage.getItem("framie_images") || "";
    let images: string[];

    try {
      images = JSON.parse(imagesJson);
    } catch (e) {
      images = [];
    }

    return images;
  }

  setLocalImages(images: string[]): void {
    localStorage.setItem("framie_images", JSON.stringify(images));
  }

}

let errLogger = (key: string) => (error: any) => {
  console.error(key, error);
  return Promise.reject(error);
};
