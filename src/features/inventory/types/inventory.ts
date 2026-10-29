/** An item that can be sold: stock-tracked inventory, a service, or a
 * non-inventory good. Service and non-inventory items hold no stock and have no
 * asset or COGS account */
export interface InventoryItem {
  id: string;
  sku: string | null;
  name: string;
  description: string | null;
  itemType: "inventory" | "service" | "non_inventory";
  salePrice: string;
  reorderPoint: string | null;
  quantityOnHand: string;
  averageCost: string;
  assetAccountId: string | null;
  cogsAccountId: string | null;
  incomeAccountId: string;
  isActive: boolean;
}
