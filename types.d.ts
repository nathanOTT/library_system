export interface Book {
  isbn: string;
  book_title: string;
  book_author: string;
  year_of_publication: number;
  publisher: string;
  image_url_s: string;
  image_url_m: string;
  image_url_l: string;
  isLoanedBook?: boolean;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  universityId: number;
  password: string;
  universityCard: string;
}

interface AllUsersParams {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  createdAt: Date;
}