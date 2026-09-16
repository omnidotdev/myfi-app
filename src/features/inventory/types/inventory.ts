/** A tracked inventory item */
export interface InventoryItem {
  id: string;
  sku: string | null;
  name: string;
  description: string | null;
  salePrice: string;
  quantityOnHand: string;
  averageCost: string;
  assetAccountId: string;
  cogsAccountId: string;
  incomeAccountId: string;
  isActive: boolean;
}
