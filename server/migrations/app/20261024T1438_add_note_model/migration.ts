#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/82b73d61af724e74edb4c0dbc7ae91170637577650802024ae04aae57bb3f80f/contract';
import startContract from '../../snapshots/82b73d61af724e74edb4c0dbc7ae91170637577650802024ae04aae57bb3f80f/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/add89c4d5f40e83ab233abdcf248b786a93af12e95881e91134ca3b912a11bd4/contract';
import endContract from '../../snapshots/add89c4d5f40e83ab233abdcf248b786a93af12e95881e91134ca3b912a11bd4/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Note',
        columns: [
          col('content', 'text', {
            notNull: true,
            default: lit(''),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
