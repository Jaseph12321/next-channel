import { relations } from "drizzle-orm";
import { integer, pgTable, uniqueIndex, uuid, varchar,unique,serial,timestamp, primaryKey } from "drizzle-orm/pg-core";


//schema

export const UserTable = pgTable("user",{
     id: varchar("id",{length: 10}).primaryKey(),
     name: varchar("name",{length: 255}).notNull(),
     age: integer("age").notNull(),
     email: varchar("email",{length: 255}).notNull().unique(),
     createdTime:timestamp("createdTime").defaultNow().notNull(),
     updatedTime:timestamp("updatedTime").defaultNow().notNull()
});


export const ChannelTable = pgTable(
    "channel",{
        id: serial('id').primaryKey().notNull(),
        channelId: varchar("channelId",{length: 255}).unique().notNull(),
        title: varchar("title",{length: 255}).notNull(),
        subscriberCount: integer("subscriberCount"),
        photoUrl: varchar("photoUrl",{length: 255}),
        userId:varchar("userId",{length: 10}).notNull().references(()=>UserTable.id),
        createdTime:timestamp("createdTime").defaultNow().notNull(),
        updatedTime:timestamp("updatedTime").defaultNow().notNull()

    }
);


// relations

export const UserTableRelations = relations(UserTable,({many})=>({
   channels: many(ChannelTable),
}));

export const ChannelTableRelations = relations(ChannelTable,({one})=>({
    user: one(UserTable,{
        fields: [ChannelTable.userId],
        references: [UserTable.id]
    })
})); 
