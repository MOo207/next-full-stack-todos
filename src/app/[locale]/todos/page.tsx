// src/app/[locale]/todos/page.tsx
import { auth } from "@/src/app/api/auth/[...nextauth]/auth";
import { fetchTodosByUser } from "@/src/app/actions/todoActions";
import TodosPageClient from "@/src/app/components/pages/TodosPageClient";
import { redirect } from "next/navigation";

const TodosPage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = await params;

  const session = await auth();

  if (!session || !session.user?.id) {
    // Redirect to login with locale preserved
    redirect(`/${locale}/auth/login`);
  }

  const userId = session.user.id;

  // Fetch todos server-side
  const todos = await fetchTodosByUser(userId);

  // Fetch localized messages for the client-side
  const messages = (await import(`@/src/i18n/messages/${locale}.json`)).default;

  return (
    <TodosPageClient
      initialTodos={todos}
      userId={userId}
      locale={locale}
      messages={messages}
    />
  );
};

export default TodosPage;
