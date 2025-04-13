import { calculateTotalBudget, getProductsByPriority, formatBudget, getAverageBudget, getHighestBudgetProduct } from '../productUtils';

let mockProducts = [
  {
    id: "1",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "3.9",
  },
  {
    id: "2",
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    priority: "Medium",
    pbg: "secondary.main",
    budget: "24.5",
  },
  {
    id: "3",
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    priority: "High",
    pbg: "error.main",
    budget: "12.8",
  },
  {
    id: "4",
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    priority: "Critical",
    pbg: "success.main",
    budget: "2.4",
  },
];

describe('Product Utils', () => {
  describe('calculateTotalBudget', () => {
    it('should calculate total budget correctly', () => {
      let total = calculateTotalBudget(mockProducts);
      expect(total).toBe(43.6);
    });

    it('should return 0 for empty array', () => {
      let total = calculateTotalBudget([]);
      expect(total).toBe(0);
    });
  });

  describe('getProductsByPriority', () => {
    it('should filter products by priority', () => {
      let highPriorityProducts = getProductsByPriority(mockProducts, 'High');
      expect(highPriorityProducts).toHaveLength(1);
      expect(highPriorityProducts[0].name).toBe('Christopher Jamil');
    });

    it('should return empty array for non-existent priority', () => {
      let products = getProductsByPriority(mockProducts, 'NonExistent');
      expect(products).toHaveLength(0);
    });
  });

  describe('formatBudget', () => {
    it('should format budget correctly', () => {
      let formatted = formatBudget('3.9');
      expect(formatted).toBe('$3.9k');
    });

    it('should handle zero budget', () => {
      let formatted = formatBudget('0');
      expect(formatted).toBe('$0k');
    });
  });

  describe('getAverageBudget', () => {
    it('should calculate average budget correctly', () => {
      let average = getAverageBudget(mockProducts);
      expect(average).toBe(10.9); // 43.6 / 4
    });

    it('should return 0 for empty array', () => {
      let average = getAverageBudget([]);
      expect(average).toBe(0);
    });
  });

  describe('getHighestBudgetProduct', () => {
    it('should return product with highest budget', () => {
      let highest = getHighestBudgetProduct(mockProducts);
      expect(highest?.name).toBe('Andrew McDownland');
      expect(highest?.budget).toBe('24.5');
    });

    it('should return null for empty array', () => {
      let highest = getHighestBudgetProduct([]);
      expect(highest).toBeNull();
    });
  });
}); 