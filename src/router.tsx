import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'

import { HomePage } from './routes/index'
import { NFTDetailPage } from './routes/nft-detail'
import { CartPage } from './routes/cart'
import { CheckoutPage } from './routes/checkout'
import { OrderConfirmationPage } from './routes/order-confirmation'
import { SignupPage } from './routes/signup'
import { LoginPage } from './routes/login'
import { ProfilePage } from './routes/profile'
import { WalletsPage } from './routes/wallets'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const nftDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/nft/$nftId',
  component: NFTDetailPage,
})

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
})

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
})

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order-confirmation',
  validateSearch: (search: Record<string, unknown>) => ({
    orderId: typeof search.orderId === 'string'
      ? search.orderId
      : '',
  }),
  component: OrderConfirmationPage,
})

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignupPage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
})

const walletsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wallets',
  component: WalletsPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  nftDetailRoute,
  cartRoute,
  checkoutRoute,
  orderConfirmationRoute,
  signupRoute,
  loginRoute,
  profileRoute,
  walletsRoute,
])

const router = createRouter({
  routeTree,
})

export { router }
