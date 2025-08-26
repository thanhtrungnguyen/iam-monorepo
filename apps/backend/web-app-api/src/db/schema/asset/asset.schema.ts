import { pgTable, uuid, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenant } from '../tenant/tenant.schema';
import { timestamps } from '../../columns.helpers';
import { assetMovement } from './asset-movement.schema';
import { pgEnum } from 'drizzle-orm/pg-core';

export const assetStatus = pgEnum('asset_status', ['in', 'out', 'maintenance']);

export const asset = pgTable(
  'asset',
  {
    id: uuid().defaultRandom().primaryKey(),
    code: text().notNull(),
    name: text().notNull(),
    location: text(),
    status: assetStatus().default('in').notNull(),
    tenantId: uuid()
      .references(() => tenant.id, { onDelete: 'cascade' })
      .notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex('asset_code_tenant_uq').on(table.code, table.tenantId)],
);

export const assetRelations = relations(asset, ({ one, many }) => ({
  tenant: one(tenant, { fields: [asset.tenantId], references: [tenant.id] }),
  movement: many(assetMovement),
}));
