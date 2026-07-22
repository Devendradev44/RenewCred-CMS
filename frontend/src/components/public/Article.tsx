interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Article({ title, children }: Props) {
  return (
    <article className="flex-1">
      <h1 className="mb-8 text-4xl font-bold">{title}</h1>

      {children}
    </article>
  );
}