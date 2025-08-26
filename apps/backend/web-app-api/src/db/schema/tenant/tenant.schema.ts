import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from '../iam/user.schema';
import { role } from '../iam/role.schema';
import { group } from '../iam/group.schema';
import { asset } from '../asset/asset.schema';
import { project } from '../project/project.schema';
import { employee } from '../employee/employee.schema';
import { menuItem } from '../menu/menu_item.schema';
import { policy } from '../iam/policy.schema';
import { timestamps } from '../../columns.helpers';
import { uniqueIndex } from 'drizzle-orm/pg-core';

export const tenant = pgTable(
  'tenant',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    slug: text().notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex('tenant_slug_uq').on(table.slug)],
);

// export const tenantIdx = {
//   // slugUnique: uniqueIndex('tenant_slug_uq').on(tenant.slug),
// };

export const tenantRelations = relations(tenant, ({ many }) => ({
  // Lazy imports to avoid cycles
  user: many(user),
  role: many(role),
  group: many(group),
  policy: many(policy),
  menuItem: many(menuItem),
  employee: many(employee),
  project: many(project),
  asset: many(asset),
}));
