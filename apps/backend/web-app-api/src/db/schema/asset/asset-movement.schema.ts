import { pgTable, uuid, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { asset } from './asset.schema';
import { user } from '../iam/user.schema';
import { tenant } from '../tenant/tenant.schema';
import { pgEnum } from 'drizzle-orm/pg-core';
import { timestamps } from '../../columns.helpers';
export const movementType = pgEnum('movement_type', ['in', 'out', 'transfer']);
export const assetMovement = pgTable('asset_movement', {
  id: uuid('id').defaultRandom().primaryKey(),
  assetId: uuid('asset_id')
    .references(() => asset.id, { onDelete: 'cascade' })
    .notNull(),
  type: movementType('type').notNull(),
  qty: integer('qty').default(1),
  note: text('note'),
  createdBy: uuid('created_by').references(() => user.id, { onDelete: 'set null' }),
  tenantId: uuid('tenant_id')
    .references(() => tenant.id, { onDelete: 'cascade' })
    .notNull(),
  ...timestamps,
});

export const assetMovementRelations = relations(assetMovement, ({ one }) => ({
  asset: one(asset, { fields: [assetMovement.assetId], references: [asset.id] }),
  creator: one(user, { fields: [assetMovement.createdBy], references: [user.id] }),
  tenant: one(tenant, { fields: [assetMovement.tenantId], references: [tenant.id] }),
}));
