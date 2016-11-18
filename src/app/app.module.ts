import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FramePage } from '../pages/frame/frame';

@NgModule({
  declarations: [
    MyApp,
    FramePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FramePage
  ],
  providers: []
})
export class AppModule {}
