import { pgTable, uuid, text, integer, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenant } from '../tenant/tenant.schema';

export const menuItem = pgTable('menu_item', {
  id: uuid().defaultRandom().primaryKey(),
  parentId: uuid(),
  label: text().notNull(),
  icon: text(),
  path: text(),
  order: integer().default(0),
  featureFlag: text(),
  requiredActions: jsonb().$type<string[]>().default([]).notNull(),
  tenantId: uuid()
    .references(() => tenant.id, { onDelete: 'cascade' })
    .notNull(),
});

export const menuRelations = relations(menuItem, ({ one, many }) => ({
  tenant: one(tenant, { fields: [menuItem.tenantId], references: [tenant.id] }),
  parent: one(menuItem, { fields: [menuItem.parentId], references: [menuItem.id] }),
  children: many(menuItem),
}));
