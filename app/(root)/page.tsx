import React from "react";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import drizzleDb from "@/database/drizzle";
import { registration } from "@/database/schema";

const Home = async () => {
  const loggoedIn = await drizzleDb.select().from(registration);
  console.log(JSON.stringify(loggoedIn, null, 2));
  return (
    <>
      <BookOverview />
      <BookList />
    </>
  );
};

export default Home;
