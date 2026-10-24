#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/4466c41916f96cb0bb32da8b7bd4eb5563f26d9f63156c0955f45863e108da22/contract';
import endContract from '../../snapshots/4466c41916f96cb0bb32da8b7bd4eb5563f26d9f63156c0955f45863e108da22/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/add89c4d5f40e83ab233abdcf248b786a93af12e95881e91134ca3b912a11bd4/contract';
import startContract from '../../snapshots/add89c4d5f40e83ab233abdcf248b786a93af12e95881e91134ca3b912a11bd4/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Note',
        column: 'userId',
        type: 'uuid',
      }),
      this.createIndex({
        schema: 'public',
        table: 'Note',
        index: 'Note_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Note',
        foreignKey: {
          name: 'Note_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
