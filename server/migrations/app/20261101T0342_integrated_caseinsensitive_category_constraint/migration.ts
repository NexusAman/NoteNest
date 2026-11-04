#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0dd008e14b00f356d8a89d15dcd454724354157545ab864b517c94e2a72d40f4/contract';
import startContract from '../../snapshots/0dd008e14b00f356d8a89d15dcd454724354157545ab864b517c94e2a72d40f4/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/94d520995d679fb0c88c612180b8276264f27e09c0c1ca7c9c773bedcde67b97/contract';
import endContract from '../../snapshots/94d520995d679fb0c88c612180b8276264f27e09c0c1ca7c9c773bedcde67b97/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropConstraint({
        schema: 'public',
        table: 'Category',
        constraint: 'Category_userId_name_key',
      }),
      this.createIndex({
        schema: 'public',
        table: 'Category',
        index: 'category_user_lower_name_876879a5',
        expression: sql`"userId", lower(name)`,
        extras: { unique: true },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
