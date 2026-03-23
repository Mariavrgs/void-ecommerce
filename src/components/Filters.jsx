import { CATEGORIES } from "../data/products";

export default function Filters({ cat, setCat, sort, setSort, priceMax, setPriceMax }) {
  return (
    <div className="filters-bar" id="products">
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
          <option value={1000}>Todos os preços</option>
          <option value={150}>Até R$ 150</option>
          <option value={300}>Até R$ 300</option>
          <option value={500}>Até R$ 500</option>
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
