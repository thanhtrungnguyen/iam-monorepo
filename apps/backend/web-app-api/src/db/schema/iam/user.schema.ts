import { pgTable, uuid, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { tenant } from '../tenant/tenant.schema';
import { timestamps } from '../../columns.helpers';
import { userRole } from './user-role.schema';
import { userPolicy } from './user-policy.schema';
import { groupUser } from './group-user.schema';
import { employee } from '../employee/employee.schema';
import { project } from '../project/project.schema';
import { assetMovement } from '../asset/asset-movement.schema';

export const user = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull(),
  name: text('name'),
  department: text('department'),
  tenantId: uuid('tenant_id')
    .references(() => tenant.id, { onDelete: 'cascade' })
    .notNull(),
  ...timestamps,
});
export const userIdx = {
  emailTenantUq: uniqueIndex('user_email_tenant_uq').on(user.email, user.tenantId),
};

export const userRelations = relations(user, ({ one, many }) => ({
  tenant: one(tenant, { fields: [user.tenantId], references: [tenant.id] }),
  role: many(userRole),
  policy: many(userPolicy),
  group: many(groupUser),
  createdEmployee: many(employee),
  updatedEmployee: many(employee),
  ownedProject: many(project),
  assetMovement: many(assetMovement),
}));
