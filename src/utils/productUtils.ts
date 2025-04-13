interface Product {
  id: string;
  name: string;
  post: string;
  pname: string;
  priority: string;
  pbg: string;
  budget: string;
}

export function calculateTotalBudget(products: Product[]): number {
  return products.reduce((total, product) => {
    return total + parseFloat(product.budget);
  }, 0);
}

export function getProductsByPriority(products: Product[], priority: string): Product[] {
  return products.filter(product => product.priority === priority);
}

export function formatBudget(budget: string): string {
  return `$${budget}k`;
}

export function getAverageBudget(products: Product[]): number {
  if (products.length === 0) return 0;
  const total = calculateTotalBudget(products);
  return total / products.length;
}

export function getHighestBudgetProduct(products: Product[]): Product | null {
  if (products.length === 0) return null;
  return products.reduce((highest, current) => {
    return parseFloat(current.budget) > parseFloat(highest.budget) ? current : highest;
  });
} 