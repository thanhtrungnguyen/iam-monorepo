ALTER TABLE "asset_movement" RENAME COLUMN "qty" TO "quantity";--> statement-breakpoint
CREATE UNIQUE INDEX "tenant_slug_uq" ON "tenant" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_tenant_uq" ON "user" USING btree ("email","tenant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "role_name_tenant_uq" ON "role" USING btree ("name","tenant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "group_name_tenant_uq" ON "group" USING btree ("name","tenant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "policy_name_tenant_uq" ON "policy" USING btree ("name","tenant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "employee_code_tenant_uq" ON "employee" USING btree ("code","tenant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "asset_code_tenant_uq" ON "asset" USING btree ("code","tenant_id");