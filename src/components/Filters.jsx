import { CATEGORIES } from "../data/products";

export default function Filters({ cat, setCat, sort, setSort, priceMax, setPriceMax }) {
  return (
    <div className="filters-bar">
      <div className="filter-cats">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`filter-cat ${cat === c ? "active" : ""}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="filter-right">
        <select
          className="filter-select"
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
        >
          <option value={1500}>Todos os preços</option>
          <option value={200}>Até R$ 200</option>
          <option value={400}>Até R$ 400</option>
          <option value={700}>Até R$ 700</option>
          <option value={1100}>Até R$ 1.100</option>
        </select>

        <select
          className="filter-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="popular">Populares</option>
          <option value="asc">Menor preço</option>
          <option value="desc">Maior preço</option>
        </select>
      </div>
    </div>
  );
}
