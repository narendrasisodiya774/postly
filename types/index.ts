export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserContextType {
  user: User | null;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface StoredUser {
  name: string;
  email: string;
  password: string;
}

export interface PostMarkdownProps {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

export interface PostPageProps {
  posts: Post[];
  // session: Session | null; // session can be null if not authenticated
}

export interface PostProps {
  post: Post;
}

export interface PostDetailProps {
  post: Post;
}

export interface Post {
  id: string;
  title: string;
  body: string;
}

export interface MarkDownDetailProps {
  post: PostMarkdownProps;
}

