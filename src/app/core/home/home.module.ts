import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../auth/auth.guard';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CarouselModule } from 'primeng/carousel';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { SkeletonComponent } from '../../shared/skeleton/skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({

    declarations:[HomeComponent, SkeletonComponent],
    imports: [  CommonModule,
                MatPaginatorModule,
                NgxSkeletonLoaderModule,
                CarouselModule,
                CommonModule,
                MatPaginatorModule,
                CarouselModule,
                MatIconModule,
                MatTabsModule,
                TranslateModule.forRoot({
                    loader: {
                      provide: TranslateLoader,
                      useFactory: HttpLoaderFactory,
                      deps: [HttpClient],
                    },}),
                RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeModule {}