// types/dashboard.ts

export interface SummaryStatistic {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderSale: number;
  totalUnpaid: number;
  changes: {
    totalSales: string;
    totalOrders: string;
    totalCustomers: string;
    averageOrderSale: string;
    totalUnpaid: string;
  };
}

export interface TodayStatistic {
  todaySales: number;
  todayOrders: number;
  todayCustomers: number;
  changes: {
    todaySales: string;
    todayOrders: string;
    todayCustomers: string;
  };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  slug: string;
  stock: number;
  sku: string;
}

export interface Stone {
  id: number;
  name: string;
  name_en: string;
  zodiac: string;
  zodiac_en: string;
  price: number;
  sku: string;
}

export interface Service {
  id: number;
  name_hi: string;
  name_en: string;
  description_en: string;
  description_hi: string;
  price: number;
  slug: string;
  sku: string;
}

export interface ProductInventory {
  products: Product[];
  stones: Stone[];
  services: Service[];
}

export interface PerformanceDataPoint {
  date: string; // e.g. '08 Apr'
  visitors: number;
  unique_visitors: number;
  sales: number;
  orders: number;
  conversionRate: string; // e.g. '25.00%'
}

export interface StorePerformance {
  performanceData: PerformanceDataPoint[];
  dateRange: {
    start: string; // ISO string: '2025-03-12'
    end: string;   // ISO string: '2025-04-11'
    formattedRange: string; // e.g. '12 Mar - 11 Apr'
  };
  totals: {
    visitors: number;
    unique_visitors: number;
    sales: number;
    orders: number;
    conversionRate: string; // e.g. '55.56%'
  };
}

export interface TopSellingProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  total_sold: number;
  total_revenue: number;
}

export interface TopCustomer {
  id: number;
  name: string;
  email: string;
  order_count: number;
  total_spent: number;
  last_order_date: string;
}

export interface TopSellingStone {
  id: number;
  name: string;
  name_en: string;
  zodiac: string;
  zodiac_en: string;
  price: number;
  total_carats_sold: number;
  total_sold: number;
  total_revenue: number;
}

export interface TopSellingService {
  id: number;
  name: string;
  name_hi?: string;
  slug?: string;
  price?: number;
  icon?: string;
  total_sold: number;
  total_revenue: number;
}

export interface DashboardData {
  summaryStats: SummaryStatistic;
  todayStats: TodayStatistic;
  productInventory: ProductInventory;
  storePerformance: StorePerformance;
  topSellingProducts: TopSellingProduct[];
  topSellingServices: TopSellingService[];
  topSellingStones: TopSellingStone[];
  topCustomers: TopCustomer[];
}
