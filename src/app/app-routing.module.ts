import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    //redirectTo: 'homex',
    ////redirectTo: 'homexshell',
    
    //APP STARTER MAIN
    redirectTo: 'splashx',
    //redirectTo:'testx',

    //redirectTo: 'testx',
    
    //redirectTo: 'ordersx',
    pathMatch: 'full'
  },
   {
    path: 'ordersx',
    loadChildren: () => import('./ordersx/ordersx.module').then( m => m.OrdersxPageModule)
  },
  {
    path: 'aboutx',
    loadChildren: () => import('./aboutx/aboutx.module').then( m => m.AboutxPageModule)
  },
   {
    path: 'categories-detail',
    loadChildren: () => import('./categories-detail/categories-detail.module').then( m => m.CategoriesDetailPageModule)
  },
  {
    path: 'add-item-to-cart',
    loadChildren: () => import('./add-item-to-cart/add-item-to-cart.module').then( m => m.AddItemToCartPageModule)
  },
  {
    path: 'bill-cart-list',
    loadChildren: () => import('./bill-cart-list/bill-cart-list.module').then( m => m.BillCartListPageModule)
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'progressive-shell-resolver',
    loadChildren: './progressive-shell-resolver/progressive-shell-resolver.module#ProgressiveShellResolverPageModule'
  },
  {
    path: 'homexshell',
    loadChildren: () => import('./homexshell/homexshell.module').then( m => m.HomexshellPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'splashx',
    loadChildren: () => import('./splashx/splashx.module').then( m => m.SplashxPageModule)
  },
  {
    path: 'testx',
    loadChildren: () => import('./testx/testx.module').then( m => m.TestxPageModule)
  },
  {
    path: 'exitx',
    loadChildren: () => import('./exitx/exitx.module').then( m => m.ExitxPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
