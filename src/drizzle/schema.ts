import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

//schema

export const UserTable = pgTable("user", {
  id: varchar("id", { length: 10 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdTime: timestamp("createdTime").defaultNow().notNull(),
  updatedTime: timestamp("updatedTime").defaultNow().notNull(),
});

export const ChannelTable = pgTable(
  "channel",
  {
    id: serial("id").primaryKey().notNull(),
    channelId: varchar("channelId", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    subscriberCount: integer("subscriberCount"),
    photoUrl: varchar("photoUrl", { length: 255 }),
    userId: varchar("userId", { length: 10 })
      .notNull()
      .references(() => UserTable.id),
    createdTime: timestamp("createdTime").defaultNow().notNull(),
    updatedTime: timestamp("updatedTime").defaultNow().notNull(),
  },
  (table) => {
    return {
      userChannelUnique: unique().on(table.userId, table.channelId),
    };
  }
);

// relations

export const UserTableRelations = relations(UserTable, ({ many }) => ({
  channels: many(ChannelTable),
}));

export const ChannelTableRelations = relations(ChannelTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [ChannelTable.userId],
    references: [UserTable.id],
  }),
}));
