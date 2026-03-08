export default function CategoryFilter({ categories, selected, onChange }) {
  if (!categories?.length) return null;

  return (
    <div className="category-filter">
      <span className="label">Filter:</span>
      <button
        type="button"
        onClick={() => onChange('')}
        className={`filter-chip ${!selected ? 'active' : ''}`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`filter-chip ${selected === cat ? 'active' : ''}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
