import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { FrameImageService } from './frame-image.service';
import * as CONFIG from '../../config';

@Component({
  selector: 'page-frame',
  templateUrl: 'frame.html',
  providers: [FrameImageService]
})
export class FramePage {

  displayedImages: {first?: string, second?: string} = {};
  activeImage: string;
  baseUrl: string;

  private images: string[] = [];

  private loading: boolean = false;
  private paused: boolean = false;
  private timer: number = null;

  constructor(platform: Platform, private frameImage: FrameImageService) {
    console.log("FramePage", this);

    this.images = this.frameImage.getLocalImages();

    if (this.images.length > 0) {
      this.showImage(this.images[0]);
    }

    platform.ready().then(() => {
      this.baseUrl = cordova.file.dataDirectory;
      this.runIteration();
    });

    platform.pause.subscribe(() => {
        this.paused = true;
        this.stopIteration();
    });
    platform.resume.subscribe(() => {
        this.paused = false;
        this.startIteration();
    });
  }

  private startIteration() {
    if (!this.loading && !this.paused) {
      this.timer = setTimeout(() => this.runIteration(), CONFIG.durationOfImage());
    }
  }

  private stopIteration() {
    clearTimeout(this.timer);
  }

  skipIteration() {
    if (!this.loading && !this.paused) {
      this.stopIteration();
      this.runIteration();
    }
  }

  private runIteration() {
    this.loading = true;
    this.frameImage.getRemoteImages()
      .then(remoteImages => Promise.all(remoteImages
        .filter(image => this.images.indexOf(image) === -1)
        .map(image => this.frameImage.downloadImage(image))
      ))
      .then(remoteImages => remoteImages.filter(image => image !== null))
      .then(remoteImages => {
        this.images = this.images
          .concat(remoteImages)
          .slice(-CONFIG.numberOfImages);
          // @TODO remove files that are no longer in array
        this.frameImage.setLocalImages(this.images);
      })
      .then(() => {
        let oldImageIndex = this.images.indexOf(this.displayedImages[this.activeImage]);
        let newImageIndex = oldImageIndex + 1 >= this.images.length ? 0 : oldImageIndex + 1;
        this.showImage(this.images[newImageIndex]);
      })
      .then(() => {
        this.loading = false;
        this.startIteration();
      });
  }

  private showImage(image: string) {
    if (this.displayedImages[this.activeImage] === image) {
      return;
    }
    this.activeImage = this.activeImage === 'first' ? 'second' : 'first';
    this.displayedImages[this.activeImage] = image;
  }
}
