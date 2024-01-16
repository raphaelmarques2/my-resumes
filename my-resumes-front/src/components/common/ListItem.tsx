interface Props {
  href: string;
  title: string;
  subtitle: string;
}

export function ListItem({ href, title, subtitle }: Props) {
  return (
    <a
      className="flex items-center space-x-2 rounded-lg shadow px-4 py-2 w-full bg-white border border-gray-200 hover:bg-gray-100"
      href={href}
    >
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        <div className="text-sm">{subtitle}</div>
      </div>
      <i className="fa fa-pencil flex-none" aria-hidden="true"></i>
    </a>
  );
}
