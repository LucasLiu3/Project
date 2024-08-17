export function HeadModule({ headerTitle }) {
  return (
    <tr>
      {headerTitle.map((title, index) => (
        <th key={index} className="py-3 px-4">
          {title}
        </th>
      ))}
    </tr>
  );
}
