import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import React from "react";
import BookList from "@/components/BookList";

const page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button className="book-btn" type="submit">
          Log Out
        </Button>
      </form>
      <BookList />
    </>
  );
};

export default page;
