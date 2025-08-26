import { pgTable, uuid, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenant } from '../tenant/tenant.schema';
import { timestamps } from '../../columns.helpers';
import { assetMovement } from './asset-movement.schema';
import { pgEnum } from 'drizzle-orm/pg-core';

export const assetStatus = pgEnum('asset_status', ['in', 'out', 'maintenance']);

export const asset = pgTable('asset', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: text('code').notNull(),
  name: text('name').notNull(),
  location: text('location'),
  status: assetStatus('status').default('in').notNull(),
  tenantId: uuid('tenant_id')
    .references(() => tenant.id, { onDelete: 'cascade' })
    .notNull(),
  ...timestamps,
});

export const assetIdx = {
  codeTenantUq: uniqueIndex('asset_code_tenant_uq').on(asset.code, asset.tenantId),
};

export const assetRelations = relations(asset, ({ one, many }) => ({
  tenant: one(tenant, { fields: [asset.tenantId], references: [tenant.id] }),
  movement: many(assetMovement),
}));
